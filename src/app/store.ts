import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../feature/user/user-slice';
import { apiAdminSlice } from '../feature/admin/admin-slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiAdminSlice.reducerPath]: apiAdminSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware, apiAdminSlice.middleware); 
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;