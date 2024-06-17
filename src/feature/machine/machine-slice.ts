import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../services/axiosBaseQuery'

import { Machine } from '../../types/machine'

type FetchAllMachinesResponse = {
  machines: Machine[]
}

interface CreateMachineRequest {
  name: string
  description: string
  maintenance: boolean
}

export const apiMachineSlice = createApi({
  reducerPath: 'api-machines',
  tagTypes: ['get-machines'],
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetMachines: builder.query<FetchAllMachinesResponse, void>({
      query: () => ({
        url: 'machines',
        method: 'GET',
      }),
      providesTags: ['get-machines'],
    }),
    CreateMachine: builder.mutation<void, CreateMachineRequest>({
      query: (body) => ({
        url: 'machines',
        data: body,
        method: 'POST',
      }),
      invalidatesTags: ['get-machines'],
    }),
  }),
})

export const { useGetMachinesQuery, useCreateMachineMutation } = apiMachineSlice
