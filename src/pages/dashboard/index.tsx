import Link from 'next/link';

import { GymLogo } from '../../components/Logo';
import { useGetAdminQuery } from '../../feature/admin/admin-slice';

import { CaretDown, MagnifyingGlass } from 'phosphor-react';
import { SideBar } from '../../components/SideBar';
import { Avatar } from '@chakra-ui/react';

export default function Dashboard() {
  const { data: admin, isLoading } = useGetAdminQuery();

  if(isLoading) return <h1>Loading...</h1>;

  return (
    <div className="w-full h-screen flex">

      <SideBar />

      <div className="flex flex-1 flex-col bg-primary-white p-8">
        <header className="flex w-full h-[50px] justify-between px-5"> 
          <h1 className="font-bold text-3xl text-secondary-blue">Dashboard</h1>
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
              <span className="text-secondary-gray font-normal text-sm">{admin.name}</span>
              <button type="button" className="">
                <CaretDown />
              </button>
            </div>
          </div>
        </header>   
        <div className="h-screen grid grid-cols-3 bg-black mt-2">
        </div>
      </div>
    </div>
  )
}