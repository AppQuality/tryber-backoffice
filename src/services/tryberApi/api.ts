// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "tryberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    paramsSerializer: (params) => {
      let urlps = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        // remove undefined values
        if (typeof value === "undefined") {
          return;
        }
        // iterate over nested objects
        if (typeof value === "object") {
          Object.entries(params[key]).forEach(([key, value]) => {
            if (typeof value === "string") {
              urlps.set(`filterBy[${key}]`, value);
            }
          });
          return;
        }
        // or just set url param
        urlps.set(key, value);
      });
      return urlps.toString();
    },
    prepareHeaders: (headers) => {
      if (process.env.REACT_APP_DEFAULT_TOKEN) {
        const token = process.env.REACT_APP_DEFAULT_TOKEN;
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}), // auto generated npm run generate-api
});
