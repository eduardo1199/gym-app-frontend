import { Select } from '@chakra-ui/select'
import { addHours, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { useGetPlansQuery } from '../../../../feature/plan/plan-slice'
import {
  useGetUserQuery,
  useCreateUserMutation,
} from '../../../../feature/user/user-slice'
import { Skeleton, Stack, useToast } from '@chakra-ui/react'

interface StudentFormProps {
  onCloseModalEdit: () => void
  userId: string
}

const UserDataSchema = z.object({
  name: z.string().min(1).nullable(),
  weight: z.number().min(0).nullable(),
  cpf: z
    .string()
    .max(14, 'Quantidade máxima é 14!')
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido!')
    .nullable(),
  age: z.number().min(15).nullable(),
  planId: z.string().uuid().nullable(),
  startDateForPlan: z.string().nullable().optional(),
})

type UserDataForm = z.infer<typeof UserDataSchema>

export function StudentForm({ onCloseModalEdit, userId }: StudentFormProps) {
  const { data: plans } = useGetPlansQuery()
  const { data: user, isLoading } = useGetUserQuery(userId)
  const toast = useToast()
  const [handleCreateUser] = useCreateUserMutation()

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDataForm>({
    resolver: zodResolver(UserDataSchema),
    values: {
      planId: user?.planId ?? null,
      cpf: user?.cpf ?? null,
      age: user?.age ?? null,
      name: user?.name ?? null,
      weight: user?.weight ?? null,
      startDateForPlan: format(
        addHours(
          new Date(user?.startDateForPlan ?? new Date().toISOString()),
          3,
        ),
        'yyyy-MM-dd',
        {
          locale: ptBR,
        },
      ),
    },
  })

  async function handleEditStudentForm(data: UserDataForm) {
    console.log(data)
    try {
      const userData = {
        ...data,
        startDateForPlan: data.startDateForPlan
          ? new Date(data.startDateForPlan).toISOString()
          : undefined,
      }

      if (!user?.id) {
        await handleCreateUser(userData)

        reset()
        onCloseModalEdit()

        toast({
          colorScheme: 'danger',
          title: 'Usuário cadastrado com sucesso!',
          isClosable: true,
        })

        return
      }
    } catch (error) {
      toast({
        colorScheme: 'danger',
        title: 'Error ao cadastrar usuário!',
        isClosable: true,
      })
    }
  }

  if (isLoading) {
    return (
      <Stack gap="32px" marginBottom="15px">
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
        <Skeleton height="35px" />
      </Stack>
    )
  }

  return (
    <form
      action=""
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleEditStudentForm)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-bold text-primary-pink">
          Nome
        </label>
        <input
          placeholder="Nome do aluno"
          id="name"
          className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
          {...register('name')}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="age" className="font-bold text-primary-pink">
          Idade
        </label>
        <input
          placeholder="Idade do aluno"
          className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
          {...register('age', { valueAsNumber: true })}
          required
          id="age"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="weight" className="font-bold text-primary-pink">
          Peso
        </label>
        <input
          placeholder="Peso do aluno"
          className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
          {...register('weight', { valueAsNumber: true })}
          required
          id="weight"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cpf" className="font-bold text-primary-pink">
          CPF
        </label>
        <input
          type="cpf"
          placeholder="CPF do aluno"
          className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
          {...register('cpf')}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="plan" className="font-bold text-primary-pink">
          Plano
        </label>
        <Select
          id="plan"
          color="white"
          fontSize={'14px'}
          focusBorderColor={'purple.700'}
          background="#5041BC"
          filter="auto"
          brightness="125%"
          size="lg"
          border="none"
          {...register('planId')}
          isRequired
        >
          {plans?.map((plan) => {
            return (
              <option
                key={plan.id}
                value={plan.id}
                className="placeholder:text-white placeholder:text-sm !bg-primary-purple font-semibold text-sm"
              >
                {plan.name}
              </option>
            )
          })}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="startDateForPlan"
          className="font-bold text-primary-pink"
        >
          Data de Início do plano
        </label>
        <input
          type="date"
          id="startDateForPlan"
          className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
          {...register('startDateForPlan', { valueAsDate: false })}
        />
      </div>

      <div className="flex justify-between my-4">
        <button
          type="button"
          onClick={onCloseModalEdit}
          className="bg-secondary-orange p-2 rounded text-base font-bold text-white hover:bg-orange-400 transition-colors focus:outline-none focus:ring focus:ring-orange-300"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="bg-primary-yellow p-2 rounded text-base font-bold text-white hover:bg-secondary-yellow transition-colors focus:outline-none focus:ring focus:ring-yellow-300"
        >
          Cadastrar
        </button>
      </div>
    </form>
  )
}
