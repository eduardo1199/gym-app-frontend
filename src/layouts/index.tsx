import { Outlet } from 'react-router-dom'

import { SideBar } from '../components/SideBar'
import { useContext } from 'react'
import { ViewPortContext } from '../context/ViewPortContext'

export function DefaultLayout() {
  const match = useContext(ViewPortContext)

  return (
    <div className={`flex ${match ? '' : 'h-screen'} relative`}>
      <SideBar />
      <div className={`w-full bg-primary-white ${match ? '' : 'ml-[350px]'}`}>
        <Outlet />
      </div>
    </div>
  )
}
