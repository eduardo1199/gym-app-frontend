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

export const machineApi = createApi({
  reducerPath: 'api-machines',
  tagTypes: ['Machines'],
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetMachines: builder.query<FetchAllMachinesResponse, void>({
      query: () => ({
        url: 'machines',
        method: 'GET',
      }),
      providesTags: (result) => result ? result.machines.map((machine) => ({
        type: 'Machines' as const, id: machine.id
      })).concat([{ type: 'Machines', id: 'LIST' }]) : [{ type: 'Machines', id: 'LIST' }],
    }),
    CreateMachine: builder.mutation<void, CreateMachineRequest>({
      query: (body) => ({
        url: 'machines',
        data: body,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Machines', id: 'LIST' }],
    }),
    GetMachine: builder.query<GetMachineResponse, string>({
      query: (id) => ({
        url: `machines/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => result ? [{ type: 'Machines', id: result.machine.id }] : [{ type: 'Machines', id: 'LIST' }],
    }),
    UpdateMachine: builder.mutation<void, UpdateMachineParams>({
      query: ({ machine, machineId }) => ({
        url: `machines/${machineId}`,
        method: 'PUT',
        data: machine,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Machines', id: arg.machineId }],
    }),
    DeleteMachine: builder.mutation<void, { machineId: string }>({
      query: ({ machineId }) => ({
        url: `machines/${machineId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Machines', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMachinesQuery,
  useCreateMachineMutation,
  useGetMachineQuery,
  useUpdateMachineMutation,
  useDeleteMachineMutation,
} = machineApi
