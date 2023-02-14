import { Outlet } from 'react-router-dom'

import { SideBar } from '../components/SideBar'

export function DefaultLayout() {
  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <Outlet />
    </div>
  )
}