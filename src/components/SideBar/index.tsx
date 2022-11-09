import Link from "next/link";
import { ListDashes, Student, Gear, PersonSimpleRun } from "phosphor-react";
import { GymLogo } from "../Logo";
import { LinkNavigator } from "./LinkNavigator";

export function SideBar() {
  return (
    <aside className="w-[320px] h-full p-6 flex flex-col bg-primary-purple">
      <div className="h-[200px] border-b-2 border-tertiary-pink flex justify-center">
        <GymLogo 
          height="52"
          width="164"
        />
      </div>
      <div className="flex flex-col gap-6 mt-3">
        <LinkNavigator 
          href="/dashboard"
          icon={<ListDashes size="18px" weight="bold" />}
          route="Dashboard"
        />
        <LinkNavigator 
          href="/students"
          icon={<Student size="18px" weight="bold" />}
          route="Alunos"
        />
        <LinkNavigator 
          href="/machines"
          icon={<Gear size="18px" weight="bold" />}
          route="Máquinas"
        />
        <LinkNavigator 
          href="/plans"
          icon={<PersonSimpleRun size="18px" weight="bold" />}
          route="Planos"
        />
      </div>
    </aside>
  )
}