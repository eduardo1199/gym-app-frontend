import { Outlet } from 'react-router-dom'

import { SideBar } from '../components/SideBar'
import { useContext } from 'react'
import { ViewPortContext } from '../context/ViewPortContext'

export function DefaultLayout() {
  const match = useContext(ViewPortContext)

  return (
    <div className={`flex ${match ? '' : 'h-screen'} `}>
      <SideBar />
      <div className="flex flex-1 flex-col bg-primary-white">
        <Outlet />
      </div>
    </div>
  )
}
