import { Outlet } from 'react-router-dom'

import { SideBar } from '../components/SideBar'

export function DefaultLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-1 flex-col bg-primary-white">
        <Outlet />
      </div>
    </div>
  )
}
