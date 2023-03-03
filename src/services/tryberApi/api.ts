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
          Object.entries(params[key]).forEach(([subKey, subValue]) => {
            if (typeof subValue === "string") {
              urlps.set(`${key}[${subKey}]`, subValue);
            } else if (Array.isArray(subValue)) {
              subValue.forEach(
                (s, i) =>
                  typeof s === "string" &&
                  urlps.set(`${key}[${subKey}][${i}]`, s)
              );
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
  tagTypes: [
    "Bugs",
    "Campaigns",
    "Customers",
    "CustomUserFields",
    "ExperiencePoints",
    "Users",
    "Media",
    "Payments",
    "Popups",
    "Devices",
    "Languages",
    "Levels",
  ],
  endpoints: () => ({}), // auto generated npm run generate-api
});
