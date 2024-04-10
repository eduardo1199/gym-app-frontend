import { useLocation } from 'react-router-dom'

import { Logout } from './Logout'
import { titleFromPage } from './utils'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app/store'

interface HeaderProps {
  visibleSearchBar: boolean
}

export function Header({ visibleSearchBar = false }: HeaderProps) {
  const { pathname } = useLocation()

  const admin = useSelector((state: RootState) => state.admin)

  console.log(visibleSearchBar)

  const title = titleFromPage(pathname)

  return (
    <header className="flex h-[50px] justify-between mb-4 p-8">
      <h1 className="font-bold text-3xl text-secondary-blue">{title}</h1>

      <Logout userName={admin?.name ?? ''} />
    </header>
  )
}
