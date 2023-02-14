import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Plan } from '../../types/plan';

export const apiPlanSlice = createApi({
  reducerPath: 'api-plans',
  baseQuery: fetchBaseQuery({
    baseUrl:  import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetPlans: builder.query<Plan[], void>({
      query: () => ({
        url: '/plans',
        method: 'GET',
      })
    })
  }),
});

export const { useGetPlansQuery } = apiPlanSlice;
