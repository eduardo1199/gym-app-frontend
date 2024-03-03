import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard/index'
import { Machines } from './pages/Machines/index'
import { Plans } from './pages/Plans/index'
import { Students } from './pages/Students/index'
import { User } from './pages/User/index'

import { DefaultLayout } from './layouts'
import { useAppSelect, useAppDispatch } from './app/hooks'
import { setToken } from './feature/auth'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'

interface CheckTokenProps {
  children: JSX.Element
}

function CheckToken(props: CheckTokenProps) {
  const dispatch = useAppDispatch()

  const token = useAppSelect((state) => state.token.token)

  useEffect(() => {
    const cookies = new Cookies()

    const token = cookies.get('@gymapp-admin')

    if (token) {
      dispatch(setToken(token))
    }
  }, [dispatch])

  if (token) {
    return <Navigate to="/dashboard" />
  } else {
    return props.children
  }
}

function RedirectToHome(props: CheckTokenProps) {
  const dispatch = useAppDispatch()

  const token = useAppSelect((state) => state.token.token)

  useEffect(() => {
    const cookies = new Cookies()

    const token = cookies.get('@gymapp-admin')

    if (token) {
      dispatch(setToken(token))
    }
  }, [dispatch])

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />
  } else {
    return props.children
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <CheckToken>
        <Home />
      </CheckToken>
    ),
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <RedirectToHome>
            <Dashboard />
          </RedirectToHome>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/machines',
        element: (
          <RedirectToHome>
            <Machines />
          </RedirectToHome>
        ),
      },
    ],
  },

  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/plans',
        element: (
          <RedirectToHome>
            <Plans />
          </RedirectToHome>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/students',
        element: (
          <RedirectToHome>
            <Students />
          </RedirectToHome>
        ),
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
  return <RouterProvider router={router} />
}
