import { useGetAdminQuery } from '../../feature/admin/admin-slice';

import { Gear, PersonSimpleRun, Student } from 'phosphor-react';

import { SideBar } from '../../components/SideBar';
import { CardStatistics } from '../../components/Cards/CardStatistics';
import { Header } from '../../components/Header';

export default function Dashboard() {
  return (
    <div className="h-screen">
      <div className="flex h-full">
        <SideBar />

        <div className="flex flex-1 flex-col bg-primary-white p-8">
          <Header />   
          <div className="h-full grid xl:grid-cols-2 gap-5 grid-cols-1 items-center">
            <CardStatistics 
              amount={20}
              description="Alunos com matrículas regulares"
              icon={<Student size="5rem" weight="bold" />}
              title="Alunos"
              variant="default"
            />
            <CardStatistics 
              amount={20}
              description="A quantidade de alunos com matrículas atrasadas é"
              icon={<Student size="5rem" weight="bold" />}
              title="Alunos"
              variant="warning"
            />
            <CardStatistics 
              amount={20}
              description="Na sua academia existem"
              icon={<Gear size="5rem" weight="bold" />}
              title="Maquinários"
              variant="default"
            />
            <CardStatistics 
              amount={20}
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