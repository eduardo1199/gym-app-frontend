import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../feature/user/user-slice'
import { machineSlice } from '../feature/machine/machine-slice'
import { apiPlanSlice } from '../feature/plan/plan-slice'
import { tokenSlice } from '../feature/auth'
import { adminAuthentication } from '../feature/admin-authentication'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [machineSlice.reducerPath]: machineSlice.reducer,
    [apiPlanSlice.reducerPath]: apiPlanSlice.reducer,
    token: tokenSlice.reducer,
    admin: adminAuthentication.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      apiSlice.middleware,
      machineSlice.middleware,
      apiPlanSlice.middleware,
    )
  },
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
