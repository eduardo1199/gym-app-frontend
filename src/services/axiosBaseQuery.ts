import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Cookies from 'universal-cookie'
interface AxiosBaseQueryParams {
  baseUrl: string
}

const cookies = new Cookies()

export const axiosBaseQuery =
  ({
    baseUrl,
  }: AxiosBaseQueryParams): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const token = cookies.get('@gymapp-admin')

      const authorizationToken = token ? `Bearer ${token}` : undefined

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': 'pt-br',
          Authorization: authorizationToken,
          ...headers,
        },
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
