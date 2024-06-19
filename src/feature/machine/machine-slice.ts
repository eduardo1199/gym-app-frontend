import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../services/axiosBaseQuery'

import { Machine } from '../../types/machine'

type FetchAllMachinesResponse = {
  machines: Machine[]
}

type GetMachineResponse = {
  machine: Machine
}
interface UpdateMachineParams {
  machine: Omit<Machine, 'id'>
  machineId: string
}

interface CreateMachineRequest {
  name: string
  description: string
  maintenance: boolean
}

export const apiMachineSlice = createApi({
  reducerPath: 'api-machines',
  tagTypes: ['get-machines', 'get-machine'],
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
    GetMachine: builder.query<GetMachineResponse, string>({
      query: (id) => ({
        url: `machines/${id}`,
        method: 'GET',
      }),
      providesTags: ['get-machine'],
    }),
    UpdateMachine: builder.mutation<void, UpdateMachineParams>({
      query: ({ machine, machineId }) => ({
        url: `machines/${machineId}`,
        method: 'PUT',
        data: machine,
      }),
      invalidatesTags: ['get-machines', 'get-machine'],
    }),
    DeleteMachine: builder.mutation<void, { machineId: string }>({
      query: ({ machineId }) => ({
        url: `machines/${machineId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['get-machines'],
    }),
  }),
})

export const {
  useGetMachinesQuery,
  useCreateMachineMutation,
  useGetMachineQuery,
  useUpdateMachineMutation,
  useDeleteMachineMutation,
} = apiMachineSlice
