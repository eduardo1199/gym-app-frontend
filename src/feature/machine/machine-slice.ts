import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../services/axiosBaseQuery'

import { Machine } from '../../types/machine'

type FetchAllMachinesResponse = {
  machines: Machine[]
}

export const apiMachineSlice = createApi({
  reducerPath: 'api-machines',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetMachines: builder.query<FetchAllMachinesResponse, void>({
      query: () => ({
        url: 'machines',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetMachinesQuery } = apiMachineSlice
