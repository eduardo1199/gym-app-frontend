import { useLocation } from 'react-router-dom'

import { Logout } from './Logout'
import { titleFromPage } from './utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app/store'

export function Header() {
  const { pathname } = useLocation()

  const admin = useSelector((state: RootState) => state.admin)

  const title = titleFromPage(pathname)

  return (
    <header className="flex items-center h-[50px] justify-between mb-4 p-8">
      <h1 className="font-bold text-3xl text-secondary-blue">{title}</h1>

      <Logout userName={admin?.name ?? ''} />
    </header>
  )
}
