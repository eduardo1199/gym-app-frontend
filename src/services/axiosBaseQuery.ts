import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

enum REQUEST_STATUS_CODE {
  Unauthorized = 401,
  NotAcceptable = 406
}
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
    // TODO: verify token expired
    const token = cookies.get('@gymapp-admin')

    if (!token) {
      redirect('/')
    }

    const authorizationToken = token ? `Bearer ${token}` : undefined

    try {
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
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === REQUEST_STATUS_CODE.Unauthorized || error.response?.status === REQUEST_STATUS_CODE.NotAcceptable) {
          window.location.href = 'http://localhost:5173/'

          return Promise.reject(error)
        }

        return {
          error,
          meta: data,
        }
      }

      return {
        error,
        meta: data,
      }
    }
  }
