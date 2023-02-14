import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Machines } from './pages/Machines';
import { Plans } from './pages/Plans';
import { Students } from './pages/Students';
import { User } from './pages/User';

import { DefaultLayout } from './layouts'

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
  return <RouterProvider router={router} />
}
