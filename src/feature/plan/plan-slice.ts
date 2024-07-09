import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../services/axiosBaseQuery'

import { Plan } from '../../types/plan'

interface GetPlansResponse {
  plans: Plan[]
}

interface GetPlanResponse {
  plan: Plan
}

interface CreatePlanRequest {
  name: string
  plan_month_time: number
  price: number
}

interface UpdatePlanRequest {
  planData: {
    name?: string
    plan_month_time?: number
    price?: number
  }
  planId: string
}

export const apiPlanSlice = createApi({
  reducerPath: 'api-plans',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['get-plans', 'get-plan'],
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
    UpdatePlan: builder.mutation<void, UpdatePlanRequest>({
      query: ({ planData, planId }) => ({
        url: `plans/${planId}`,
        method: 'PUT',
        data: planData,
      }),
      invalidatesTags: ['get-plans', 'get-plan']
    }),
    GetPlan: builder.query<GetPlanResponse, string>({
      query: (planId: string) => ({
        url: `plans/${planId}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetPlansQuery,
  useDeletePlanMutation,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useGetPlanQuery
} = apiPlanSlice
