import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { User } from '../../types/user';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const apiSlice = createApi({
  reducerPath: 'api-users',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    GetUser: builder.query<User, void>({
      query: () => ({
        url: `/user/${cookies.get('user')}`,
        method: 'GET',
      })
    })
  }),
});

export const { useGetUserQuery } = apiSlice;
