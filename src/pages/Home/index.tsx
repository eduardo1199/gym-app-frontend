import { GymLogo } from '../../components/Logo'

import { UserSearch } from './components/UserSearch'
import { AdminForm } from './components/AdminForm'

export function Home() {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="max-w-lg bg-primary-purple flex h-full p-10">
        <GymLogo height="100%" />
      </div>
      <div className="flex flex-1 justify-center flex-col p-10">
        <AdminForm />

        <UserSearch />
      </div>
    </div>
  )
}
