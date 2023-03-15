import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Machines } from './pages/Machines'
import { Plans } from './pages/Plans'
import { Students } from './pages/Students'
import { User } from './pages/User'

import { DefaultLayout } from './layouts'
import { tokenSlice } from './feature/auth'

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    loader: () => {
      const { token } = tokenSlice.getInitialState()

      if (!token) {
        return redirect('/')
      }

      return null
    },
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/',
    loader: () => {
      const { token } = tokenSlice.getInitialState()

      if (!token) {
        return redirect('/')
      }

      return null
    },
    element: <DefaultLayout />,
    children: [
      {
        path: '/machines',
        element: <Machines />,
      },
    ],
  },

  {
    path: '/',
    loader: () => {
      const { token } = tokenSlice.getInitialState()

      if (!token) {
        return redirect('/')
      }

      return null
    },
    element: <DefaultLayout />,
    children: [
      {
        path: '/plans',
        element: <Plans />,
      },
    ],
  },
  {
    path: '/',
    loader: () => {
      const { token } = tokenSlice.getInitialState()

      if (!token) {
        return redirect('/')
      }

      return null
    },
    element: <DefaultLayout />,
    children: [
      {
        path: '/students',
        element: <Students />,
      },
    ],
  },
  {
    path: '/',
    children: [
      {
        path: '/user/:id',
        element: <User />,
      },
    ],
  },
])

export function Router() {
  const { token } = tokenSlice.getInitialState()

  console.log(token)

  return <RouterProvider router={router} />
}
