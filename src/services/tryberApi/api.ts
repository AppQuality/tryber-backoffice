// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { stringify } from "qs";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "tryberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    paramsSerializer: (params) => stringify(params, { encodeValuesOnly: true }),
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
    "Prospect",
  ],
  endpoints: () => ({}), // auto generated npm run generate-api
});
