import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Machines } from './pages/Machines'
import { Plans } from './pages/Plans'
import { Students } from './pages/Students'
import { User } from './pages/User'

import { DefaultLayout } from './layouts'
import { useAppDispatch } from './app/hooks'
import { setToken } from './feature/auth'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { RootState } from './app/store'
import { useSelector } from 'react-redux'

interface CheckTokenProps {
  children: JSX.Element
}

function CheckToken(props: CheckTokenProps) {
  const dispatch = useAppDispatch()

  const token = useSelector((state: RootState) => state.token.token)

  useEffect(() => {
    const cookies = new Cookies()

    const token = cookies.get('@gymapp-admin')

    if (token) {
      dispatch(setToken(token))
    }
  }, [dispatch])

  if (token) {
    return <Navigate to="/dashboard" replace={true} />
  } else {
    return props.children
  }
}

function RedirectToHome(props: CheckTokenProps) {
  const token = useSelector((state: RootState) => state.token.token)

  if (!token) {
    return <Navigate to="/" />
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
