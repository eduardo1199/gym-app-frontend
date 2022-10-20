import { Avatar, WrapItem } from '@chakra-ui/react'

import Cookies from 'universal-cookie';

import { Barbell, Cake, Smiley } from 'phosphor-react';

import { useGetUserQuery } from '../../feature/user/user-slice';
import { dateFormat } from '../../utils';

export default function User() {
  const cookies = new Cookies();

  const { data: user, isLoading } = useGetUserQuery(cookies.get('user'));

  if(isLoading) return <h1>Loading...</h1>;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[1440px] h-[530px] bg-primary-white rounded drop-shadow-regular border-3 border-secondary-purple mx-5 my-3
        px-12 py-12
      ">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <WrapItem>
              <Avatar 
                src='https://avatars.githubusercontent.com/u/62710668?v=4' 
                size="2xl"
              />
            </WrapItem>
            <div className="mt-10 max-w-xl flex flex-col gap-8">
              <span className="text-4xl text-primary-purple font-bold">Eduardo Soares</span>
              <span className="text-3xl text-black font-bold">22 anos</span>
              <div className="flex items-center gap-3">
                <Barbell size="40px" color="#43BE83" />
                <span className="text-2xl text-black font-bold">70kg</span>
              </div>
              <div className="flex items-center gap-3">
                <Cake size="40px" color="#43BE83" />
                <span className="text-2xl text-black font-bold">11/11/1999</span>  
              </div>
            </div>
          </div>
          <div className="bg-primary-purple flex flex-1 mx-5 rounded-lg p-5">
            <div className="w-96 flex flex-col gap-16">
              <h1 className="text-5xl font-bold text-primary-white block">Seu plano irá se vencer em 
                <span className="text-secondary-green block">
                  {user.timeFinishPlan}
                </span>
              </h1>
              <p className="text-3xl text-primary-white">
                Seu plano iniciou no dia {dateFormat(user.startDateForPlan)}.
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-between items-end">
              <div className="max-w-lg">
                <h1 className="text-6xl font-bold text-secondary-green block">Seu plano está ativo.</h1>
              </div>
              <Smiley size="200px" color="#43BE83" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}