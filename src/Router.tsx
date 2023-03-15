import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Machines } from './pages/Machines'
import { Plans } from './pages/Plans'
import { Students } from './pages/Students'
import { User } from './pages/User'

import { DefaultLayout } from './layouts'
import { useAppSelect, useAppDispatch } from './app/hooks'
import { setToken } from './feature/auth'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'

function ParseRoutes() {
  const dispatch = useAppDispatch()

  const token = useAppSelect((state) => state.token.token)

  useEffect(() => {
    const cookies = new Cookies()

    const token = cookies.get('@gymapp-admin')

    if (token) {
      dispatch(setToken(token))
    }
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path: '/',
      children: [
        {
          path: '/',
          element: <Home />,
          loader: () => {
            if (token) {
              return redirect('/dashboard')
            }

            return null
          },
        },
      ],
    },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard />,
          loader: () => {
            if (!token) {
              return redirect('/')
            }

            return null
          },
        },
      ],
    },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/machines',
          element: <Machines />,
          loader: () => {
            if (!token) {
              return redirect('/')
            }

            return null
          },
        },
      ],
    },

    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/plans',
          element: <Plans />,
          loader: () => {
            if (!token) {
              return redirect('/')
            }

            return null
          },
        },
      ],
    },
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/students',
          element: <Students />,
          loader: () => {
            if (!token) {
              return redirect('/')
            }

            return null
          },
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

  return router
}

export function Router() {
  return <RouterProvider router={ParseRoutes()} />
}
