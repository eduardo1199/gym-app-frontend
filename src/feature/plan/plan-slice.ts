import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../services/axiosBaseQuery'

import { Plan } from '../../types/plan'

interface GetPlansResponse {
  plans: Plan[]
}

interface CreatePlanRequest {
  name: string
  plan_month_time: number
  price: number
}

export const apiPlanSlice = createApi({
  reducerPath: 'api-plans',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['get-plans'],
  endpoints: (builder) => ({
    GetPlans: builder.query<GetPlansResponse, void>({
      query: () => ({
        url: 'plans',
        method: 'GET',
      }),
      providesTags: ['get-plans'],
    }),
    DeletePlan: builder.mutation<void, { planId: string }>({
      query: ({ planId }) => ({
        url: `plans/${planId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['get-plans'],
    }),
    CreatePlan: builder.mutation<void, CreatePlanRequest>({
      query: (body) => ({
        url: 'plans',
        data: body,
        method: 'POST',
      }),
      invalidatesTags: ['get-plans'],
    }),
  }),
})

export const {
  useGetPlansQuery,
  useDeletePlanMutation,
  useCreatePlanMutation,
} = apiPlanSlice
