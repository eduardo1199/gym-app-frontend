/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Gear, PersonSimpleRun, Student } from 'phosphor-react'

import { useGetUsersQuery } from '../../feature/user/user-slice'
import { useGetMachinesQuery } from '../../feature/machine/machine-slice'
import { useGetPlansQuery } from '../../feature/plan/plan-slice'

import { CardStatistics } from '../../components/Cards/CardStatistics'
import { Header } from '../../components/Header'
import { useMemo } from 'react'

export function Dashboard() {
  const { data: usersData } = useGetUsersQuery()
  const { data: machinesData } = useGetMachinesQuery()
  const { data: PlansData } = useGetPlansQuery()

  const summaryStudents = useMemo(
    () =>
      (usersData?.users ?? []).reduce(
        (sum, student) => {
          if (student.isActive) {
            sum.actives += 1
          } else {
            sum.noActive += 1
          }

          return sum
        },
        {
          actives: 0,
          noActive: 0,
        },
      ),
    [usersData],
  )

  return (
    <div>
      <Header visibleSearchBar={false} />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 p-8">
        <CardStatistics
          amount={summaryStudents.actives}
          description="Alunos com matrículas regulares"
          icon={<Student size="5rem" weight="bold" />}
          title="Alunos"
          variant="default"
        />
        <CardStatistics
          amount={summaryStudents.noActive}
          description="A quantidade de alunos com matrículas atrasadas é"
          icon={<Student size="5rem" weight="bold" />}
          title="Alunos"
          variant="warning"
        />
        <CardStatistics
          amount={machinesData?.machines.length!}
          description="Na sua academia existem"
          icon={<Gear size="5rem" weight="bold" />}
          title="Maquinários"
          variant="default"
        />
        <CardStatistics
          amount={PlansData?.plans.length!}
          description="Na sua academia existem"
          icon={<PersonSimpleRun size="5rem" weight="bold" />}
          title="Tipos de planos"
          variant="default"
        />
      </div>
    </div>
  )
}
