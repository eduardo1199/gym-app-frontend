import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

interface BaseQueryAxios {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
}

interface AxiosBaseQueryProps {
  baseUrl?: string
}

export const AxiosBaseQuery =
  ({
    baseUrl = '',
  }: AxiosBaseQueryProps): BaseQueryFn<BaseQueryAxios, unknown, unknown> =>
  async ({ method, url, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axios) {
      const error = axios as AxiosError
      return {
        error: { status: error.response?.status, data: error.response?.data },
      }
    }
  }
