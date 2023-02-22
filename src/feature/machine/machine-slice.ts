import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Machine } from '../../types/machine'

export const apiMachineSlice = createApi({
  reducerPath: 'api-machines',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetMachines: builder.query<Machine[], void>({
      query: () => ({
        url: '/machines',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetMachinesQuery } = apiMachineSlice
