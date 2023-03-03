import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { User } from '../../types/user'

export const apiSlice = createApi({
  reducerPath: 'api-users',
  tagTypes: ['Users', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetUser: builder.query<User, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    GetUsers: builder.query<User[], void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    DeleteUser: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useGetUserQuery, useGetUsersQuery, useDeleteUserMutation } =
  apiSlice
