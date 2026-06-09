import { baseApi } from "../../app/baseApi";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({ query: () => "/reports" }),
  }),
  overrideExisting: false,
});

export const { useGetReportsQuery } = reportsApi;
