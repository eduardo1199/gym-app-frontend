import { Avatar, WrapItem } from '@chakra-ui/react'

import { Barbell, Cake, Smiley, SmileySad } from 'phosphor-react'
import { useParams } from 'react-router-dom'

import { useGetUserQuery } from '../../feature/user/user-slice'
import { dateFormat } from '../../utils'

export function User() {
  const { id } = useParams()

  const { data, isLoading } = useGetUserQuery(id ?? '')

  if (isLoading) return <h1>Loading...</h1>

  if (!data) return <h1>Error...</h1>

  // TODO: refazer designer da página
  return (
    <div className="h-screen flex justify-center items-center bg-primary-purple">
      <div
        className="w-[1440px] h-[530px] bg-primary-white rounded drop-shadow-regular border-3 border-secondary-purple mx-5 my-3
        px-12 py-12
      "
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <WrapItem>
              <Avatar
                src="https://avatars.githubusercontent.com/u/62710668?v=4"
                size="2xl"
              />
            </WrapItem>
            <div className="mt-10 max-w-xl flex flex-col gap-8">
              <span className="text-4xl text-primary-purple font-bold">
                {data.user.name}
              </span>
              <div className="flex items-center gap-3">
                <Barbell size="40px" color="#43BE83" />
                <span className="text-2xl text-black font-bold">
                  {data.user.weight}kg
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Cake size="40px" color="#43BE83" />
                <span className="text-2xl text-black font-bold">
                  {data.user.age}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-primary-purple flex flex-1 mx-5 rounded-lg p-5">
            <div className="w-96 flex flex-col gap-16">
              <h1 className="text-5xl font-bold text-primary-white block">
                Seu plano {data.user.isActive ? 'irá vencer em' : 'venceu faz'}
                <span
                  className={`${
                    data.user.isActive
                      ? 'text-secondary-green'
                      : 'text-alert-danger'
                  } block`}
                >
                  {data.user.timeFinishPlan}.
                </span>
              </h1>
              <p className="text-3xl text-primary-white">
                Seu plano iniciou no dia{' '}
                {dateFormat(data.user.startDateForPlan)}.
              </p>
            </div>
            <div className="flex flex-1 flex-col justify-between items-end">
              <div className="max-w-lg">
                <h1
                  className={`text-6xl font-bold ${
                    data.user.isActive
                      ? 'text-secondary-green'
                      : 'text-alert-danger'
                  } block`}
                >
                  {data.user.isActive
                    ? 'Seu plano está ativo.'
                    : 'Seu plano não está ativo.'}
                </h1>
              </div>
              {data.user.isActive ? (
                <Smiley size="200px" color="#43BE83" />
              ) : (
                <SmileySad size="200px" color="#F8342E" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
