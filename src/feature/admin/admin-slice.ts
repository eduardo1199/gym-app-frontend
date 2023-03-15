import { createApi } from '@reduxjs/toolkit/query/react'

import { Admin } from '../../types/admin'

import { AxiosBaseQuery } from '../../services/axiosBaseQuery'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const apiAdminSlice = createApi({
  reducerPath: 'api-admin',
  baseQuery: AxiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetAdmin: builder.query<Admin, void>({
      query: () => ({
        url: `admin/${cookies.get('@gymapp-admin')}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAdminQuery } = apiAdminSlice
