import { GymLogo } from '../../components/Logo'

import { UserSearch } from './components/UserSearch'
import { AdminForm } from './components/AdminForm'

export function Home() {
  return (
    <div className="w-screen h-screen flex justify-between">
      <div className="w-[400px] bg-primary-purple flex justify-center">
        <GymLogo height="60%" width='60%' />
      </div>
      <div className="mx-auto flex flex-col gap-3 justify-center">
        <AdminForm />

        <UserSearch />
      </div>
    </div>
  )
}
