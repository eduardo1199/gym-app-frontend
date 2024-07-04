/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Gear, PersonSimpleRun, Student } from 'phosphor-react'

import { useGetUsersQuery } from '../../feature/user/user-slice'
import { useGetMachinesQuery } from '../../feature/machine/machine-slice'
import { useGetPlansQuery } from '../../feature/plan/plan-slice'

import { CardStatistics } from '../../components/Cards/CardStatistics'
import { Header } from '../../components/Header'
import { useContext, useMemo } from 'react'
import { isActivePlanUser } from 'src/utils'

import { useAppDispatch } from 'src/app/hooks'
import { resetAdmin } from 'src/feature/admin-authentication'
import { resetToken } from 'src/feature/auth'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { useToast } from '@chakra-ui/react'
import { ViewPortContext } from 'src/context/ViewPortContext'

export function Dashboard() {
  const { data: usersData, error } = useGetUsersQuery()
  const { data: machinesData } = useGetMachinesQuery()
  const { data: PlansData } = useGetPlansQuery()

  const match = useContext(ViewPortContext)

  const navigation = useNavigate()
  const cookies = new Cookies()

  const dispatch = useAppDispatch()

  const toast = useToast()

  function handleLogout() {
    cookies.remove('@gymapp-admin')
    dispatch(resetToken())
    dispatch(resetAdmin())
    navigation('/')
  }

  const summaryStudents = useMemo(
    () =>
      (usersData?.users ?? []).reduce(
        (sum, student) => {
          const isStudentHavePlanActive = isActivePlanUser(
            student.start_plan_date,
            student.finish_plan_date,
          )

          if (isStudentHavePlanActive) {
            sum.activeAmount = sum.activeAmount + 1
          } else {
            sum.noActiveAmount = sum.noActiveAmount + 1
          }

          return sum
        },
        {
          activeAmount: 0,
          noActiveAmount: 0,
        },
      ),
    [usersData],
  )

  if (error) {
    if ((error as any).message.includes('406')) {
      toast({
        title: 'Autenticação necessária.',
        status: 'error',
        isClosable: true,
      })

      handleLogout()
    }
  }

  return (
    <div className={`p-2 ${match ? '' : 'ml-[350px]'}`}>
      <Header />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 p-8">
        <CardStatistics
          amount={summaryStudents.activeAmount}
          description="Alunos com matrículas regulares"
          icon={<Student size="5rem" weight="bold" />}
          title="Alunos"
          variant="default"
        />
        <CardStatistics
          amount={summaryStudents.noActiveAmount}
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
