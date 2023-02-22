import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Admin } from '../../types/admin'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const apiAdminSlice = createApi({
  reducerPath: 'api-admin',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetAdmin: builder.query<Admin, void>({
      query: () => ({
        url: `/admin/${cookies.get('admin-id')}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAdminQuery } = apiAdminSlice
