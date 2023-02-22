import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from '../feature/user/user-slice'
import { apiAdminSlice } from '../feature/admin/admin-slice'
import { apiMachineSlice } from '../feature/machine/machine-slice'
import { apiPlanSlice } from '../feature/plan/plan-slice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiAdminSlice.reducerPath]: apiAdminSlice.reducer,
    [apiMachineSlice.reducerPath]: apiMachineSlice.reducer,
    [apiPlanSlice.reducerPath]: apiPlanSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      apiSlice.middleware,
      apiAdminSlice.middleware,
    )
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
