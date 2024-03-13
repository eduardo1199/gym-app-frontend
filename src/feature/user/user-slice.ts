import { createApi } from '@reduxjs/toolkit/query/react'

import { AxiosBaseQuery } from '../../services/axiosBaseQuery'

import { User } from '../../types/user'

export interface UserDataMutation {
  name: string
  weight: number
  cpf: string
  age: number
  planId: string
  startDateForPlan: string | undefined
  id: string
}

interface UserDataMutationUpdate {
  id: string | null
  data: Omit<UserDataMutation, 'id'>
}

interface AuthenticationUser {
  cpf: string
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
    AuthenticationUser: builder.mutation<
      { user: UserDataMutation },
      AuthenticationUser
    >({
      query: (body) => ({
        method: 'POST',
        url: 'user/authentication',
        data: body,
      }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useAuthenticationUserMutation,
} = apiSlice
