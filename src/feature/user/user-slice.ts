import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../types/user';

export const apiSlice = createApi({
  reducerPath: 'api-users',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    GetUser: builder.query<User, string>({
      query: (cpf) => ({
        url: `/user/${cpf}`,
        method: 'GET',
      })
    })
  })
});

export const { useGetUserQuery } = apiSlice;
