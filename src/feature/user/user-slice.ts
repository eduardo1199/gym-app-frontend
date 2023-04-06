import { createApi } from '@reduxjs/toolkit/query/react'

import { AxiosBaseQuery } from '../../services/axiosBaseQuery'

import { User } from '../../types/user'

interface UserDataMutation {
  name: string | null
  weight: number | null
  cpf: string | null
  age: number | null
  planId: string | null
  startDateForPlan: string | null | undefined
  id: string | null
}

interface UserDataMutationUpdate {
  id: string | null
  data: Omit<UserDataMutation, 'id'>
}

export const apiSlice = createApi({
  reducerPath: 'api-users',
  tagTypes: ['Users', 'User'],
  baseQuery: AxiosBaseQuery({
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
    CreateUser: builder.mutation<
      UserDataMutation,
      Omit<UserDataMutation, 'id'>
    >({
      query: (body) => ({
        method: 'POST',
        url: 'user',
        data: body,
      }),
      invalidatesTags: ['Users'],
    }),
    UpdateUser: builder.mutation<{ message: string }, UserDataMutationUpdate>({
      query: (params) => ({
        method: 'PUT',
        url: `user/${params.id}`,
        data: params.data,
      }),
      invalidatesTags: ['Users', 'User'],
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = apiSlice
