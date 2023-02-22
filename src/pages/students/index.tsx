import { useState } from 'react'
import { Header } from '../../components/Header'
import { TableRow } from '../../components/Table/TableRow'
import { useGetUsersQuery } from '../../feature/user/user-slice'
import { dateFormat } from '../../utils'

export function Students() {
  const { data: users } = useGetUsersQuery()

  return (
    <div className="p-8">
      <Header visibleSearchBar />
      <div className="h-screen mt-10">
        <table className="w-full">
          <thead>
            <tr className="bg-primary-purple opacity-95">
              <th className="py-4 text-primary-white text-left px-3">Nome</th>
              <th className="text-primary-white text-left">Início do plano</th>
              <th className="text-primary-white text-left">Idade</th>
              <th className="text-primary-white text-left">Peso</th>
              <th className="text-primary-white text-left">Status</th>
              <th />
            </tr>
            <tr>
              <td className="py-4"></td>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <TableRow
                  key={user.id}
                  active={user.isActive}
                  ageUser={user.age}
                  id={user.id}
                  name={user.name}
                  startDatePlan={dateFormat(user.startDateForPlan)}
                  weight={user.weight}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
