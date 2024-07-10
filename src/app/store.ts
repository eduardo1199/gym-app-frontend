import { configureStore } from '@reduxjs/toolkit'

import { userApi } from '../feature/user/user-slice'
import { machineApi } from '../feature/machine/machine-slice'
import { planApi } from '../feature/plan/plan-slice'
import { tokenSlice } from '../feature/auth'
import { adminAuthentication } from '../feature/admin-authentication'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [machineApi.reducerPath]: machineApi.reducer,
    [planApi.reducerPath]: planApi.reducer,
    token: tokenSlice.reducer,
    admin: adminAuthentication.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      userApi.middleware,
      machineApi.middleware,
      planApi.middleware,
    )
  },
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
