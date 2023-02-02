import { Gear, PersonSimpleRun, Student } from 'phosphor-react';

import { useGetUsersQuery } from '../../feature/user/user-slice';
import { useGetMachinesQuery } from '../../feature/machine/machine-slice';
import { useGetPlansQuery } from '../../feature/plan/plan-slice';

import { SideBar } from '../../components/SideBar';
import { CardStatistics } from '../../components/Cards/CardStatistics';
import { Header } from '../../components/Header';

export default function Dashboard() {
  const { data: Users } = useGetUsersQuery();
  const { data: Machines } = useGetMachinesQuery();
  const { data: Plans } = useGetPlansQuery();


  const summaryStudents = (Users ?? []).reduce((sum, student) => {
    if(student.isActive) {
      sum.actives += 1
    } else {
      sum.noActive += 1
    }

    return sum;
  }, {
    actives: 0,
    noActive: 0
  })

  return (
    <div className="h-screen">
      <div className="flex h-full">
        <SideBar />

        <div className="flex flex-1 flex-col bg-primary-white p-8">
          <Header />   
          <div className="h-full grid xl:grid-cols-2 gap-5 grid-cols-1 items-center">
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
              amount={Machines?.length}
              description="Na sua academia existem"
              icon={<Gear size="5rem" weight="bold" />}
              title="Maquinários"
              variant="default"
            />
            <CardStatistics 
              amount={Plans?.length}
              description="Na sua academia existem"
              icon={<PersonSimpleRun size="5rem" weight="bold" />}
              title="Tipos de planos"
              variant="default"
            />
          </div>
        </div>
      </div>      
    </div>
  )
}