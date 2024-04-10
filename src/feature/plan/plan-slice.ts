import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../services/axiosBaseQuery'

import { Plan } from '../../types/plan'

interface GetPlansResponse {
  plans: Plan[]
}

export const apiPlanSlice = createApi({
  reducerPath: 'api-plans',
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetPlans: builder.query<GetPlansResponse, void>({
      query: () => ({
        url: 'plans',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetPlansQuery } = apiPlanSlice
