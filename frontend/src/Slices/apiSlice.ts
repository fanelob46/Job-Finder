import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({baseUrl: "" })

export const apiSlice = createApi({
  reducerPath: "api", // Optional, specifies the slice name in the store
  baseQuery,
  tagTypes: ["User","Job"], // Specify types for cache invalidation and tagging
  endpoints: (_) => ({}),
});

// export const apiReducer = apiSlice.reducer;
