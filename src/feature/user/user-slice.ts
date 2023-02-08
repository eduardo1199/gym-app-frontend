import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AxiosBaseQuery } from '../../services/axiosBaseQuery';

import { User } from '../../types/user';

export const apiSlice = createApi({
  reducerPath: 'api-users',
  tagTypes: ['User'],
  baseQuery: AxiosBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    GetUser: builder.query<User, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
    }),
    GetUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      })
    })
  }),

});

export const { useGetUserQuery, useGetUsersQuery } = apiSlice;
