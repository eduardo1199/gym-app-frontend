import { useLocation } from 'react-router-dom'
import { useGetAdminQuery } from '../../feature/admin/admin-slice'

import { InputSearch } from './InputSearch'
import { Logout } from './Logout'
import { titleFromPage } from './utils'

interface HeaderProps {
  visibleSearchBar: boolean
}

export function Header({ visibleSearchBar }: HeaderProps) {
  const { pathname } = useLocation()

  const title = titleFromPage(pathname)

  const { data: admin } = useGetAdminQuery()

  return (
    <header className="flex h-[50px] justify-between mb-4 p-8">
      <h1 className="font-bold text-3xl text-secondary-blue">{title}</h1>

      <Logout userName={admin?.name ?? ''} />
    </header>
  )
}
