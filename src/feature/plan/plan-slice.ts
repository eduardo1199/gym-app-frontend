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

export const planApi = createApi({
  reducerPath: 'api-plans',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Plans'],
  endpoints: (builder) => ({
    GetPlans: builder.query<GetPlansResponse, void>({
      query: () => ({
        url: 'plans',
        method: 'GET',
      }),
      providesTags: (result) => result ? result.plans.map((plan) => ({
        type: 'Plans' as const, id: plan.id
      })).concat([{ type: 'Plans', id: 'LIST' }]) : [{ type: 'Plans', id: 'LIST' }],
    }),
    DeletePlan: builder.mutation<void, { planId: string }>({
      query: ({ planId }) => ({
        url: `plans/${planId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Plans', id: 'LIST' }],
    }),
    CreatePlan: builder.mutation<void, CreatePlanRequest>({
      query: (body) => ({
        url: 'plans',
        data: body,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Plans', id: 'LIST' }],
    }),
    UpdatePlan: builder.mutation<void, UpdatePlanRequest>({
      query: ({ planData, planId }) => ({
        url: `plans/${planId}`,
        method: 'PUT',
        data: planData,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Plans', id: arg.planId }],
    }),
    GetPlan: builder.query<GetPlanResponse, string>({
      query: (planId: string) => ({
        url: `plans/${planId}`,
        method: 'GET',
      }),
      providesTags: (result) => result ? [{ type: 'Plans', id: result.plan.id }] : [{ type: 'Plans', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetPlansQuery,
  useDeletePlanMutation,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useGetPlanQuery
} = planApi
