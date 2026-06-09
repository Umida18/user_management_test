import { baseApi } from '../../app/baseApi'

export const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => '/roles',
      providesTags: ['Roles'],
    }),
  }),
})

export const { useGetRolesQuery } = rolesApi
