import { baseApi } from "../../app/baseApi";

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({ query: () => "/payments" }),
  }),
  overrideExisting: false,
});

export const { useGetPaymentsQuery } = paymentsApi;
