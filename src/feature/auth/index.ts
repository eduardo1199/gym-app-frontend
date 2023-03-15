import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TokenUser {
  token: string | null
}

const initialState: TokenUser = {
  token: null,
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },

    resetToken: (state) => {
      state.token = null
    },
  },
})

export const { setToken, resetToken } = tokenSlice.actions
export default tokenSlice.reducer
