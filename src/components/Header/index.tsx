import { Avatar } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { CaretDown, MagnifyingGlass } from "phosphor-react";

import { useGetAdminQuery } from "../../feature/admin/admin-slice";

export function Header() {
  const router = useRouter();

  const title = router.asPath.split('/')[1].toUpperCase();

  const { data: admin } = useGetAdminQuery();

  return (
    <header className="flex h-[50px] justify-between px-5"> 
      <h1 className="font-bold text-3xl text-secondary-blue">{title}</h1>
      <div className="flex gap-10">
        <label className="flex h-10 w-[400px] gap-1 justify-between bg-secondary-pink items-center px-3 py-2 rounded-3xl" form="search">
          <input 
            type="text"
            id="search"
            className="bg-secondary-pink w-full"
            onChange={() => {}}
            placeholder="Search"
          />
          <MagnifyingGlass size="18px" />
        </label>
        <div className="flex items-center gap-2">
          <Avatar 
            src='https://avatars.githubusercontent.com/u/62710668?v=4' 
            size="md"
          />
          <span className="text-secondary-gray font-normal text-sm">{admin?.name}</span>
          <button type="button" className="">
            <CaretDown />
          </button>
        </div>
      </div>
    </header>
  )
}