import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../../services/axiosBaseQuery'

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

export interface UserDataUpdate {
  name?: string | null
  weight?: number | null
  cpf?: string | null
  age?: number | null
  planId?: string | null
  startDateForPlan?: string | null
}

export interface UpdateUserMutation {
  id: string
  data: UserDataUpdate
}

interface AuthenticationUser {
  cpf: string
}

interface GetUserResponse {
  user: User
}

interface UseGetUsersQueryResponse {
  users: User[]
}

interface CreateUserMutationRequest {
  name: string
  weight: number
  cpf: string
  age: number
  planId: string
  start_plan_date: string
}

export const apiSlice = createApi({
  reducerPath: 'api-users',
  tagTypes: ['Users', 'User'],
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    GetUser: builder.query<GetUserResponse, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    GetUsers: builder.query<UseGetUsersQueryResponse, void>({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
    DeleteUser: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    CreateUser: builder.mutation<void, CreateUserMutationRequest>({
      query: (body) => ({
        method: 'POST',
        url: 'users',
        data: body,
      }),
      invalidatesTags: ['Users'],
    }),
    UpdateUser: builder.mutation<unknown, UpdateUserMutation>({
      query: (params) => ({
        method: 'PUT',
        url: `users/${params.id}`,
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
        url: 'users/authentication',
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
