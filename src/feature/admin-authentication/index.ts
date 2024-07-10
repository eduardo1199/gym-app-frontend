import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

export type JWTPayload = {
  id?: string
  cpf?: string
  name?: string
  iat?: number
  exp?: number
}

const initialState: JWTPayload = {} as JWTPayload

export const adminAuthentication = createSlice({
  name: 'admin-authentication',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<string>) => {
      const serializedToken = jwtDecode<JWTPayload>(action.payload)

      state = serializedToken
    },

    resetAdmin: (state) => {
      state = {} as JWTPayload
    },
  },
  selectors: {
    isAuthenticated: (state) => {
      return !!state.id
    },
  },
})

export const { resetAdmin, setAdmin } = adminAuthentication.actions
export default adminAuthentication.reducer
