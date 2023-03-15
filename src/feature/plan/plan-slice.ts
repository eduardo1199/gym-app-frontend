import { createApi } from '@reduxjs/toolkit/query/react'

import { AxiosBaseQuery } from '../../services/axiosBaseQuery'

import { Plan } from '../../types/plan'

export const apiPlanSlice = createApi({
  reducerPath: 'api-plans',
  baseQuery: AxiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetPlans: builder.query<Plan[], void>({
      query: () => ({
        url: 'plans',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetPlansQuery } = apiPlanSlice
