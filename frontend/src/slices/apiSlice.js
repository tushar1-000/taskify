// features/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // Unique key for the API slice in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl: "" }), // Base URL for all requests,
  tagTypes: ["User", "Tasks"],
  endpoints: () => ({}),
});
