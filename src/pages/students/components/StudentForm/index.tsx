import { Select } from '@chakra-ui/select'
import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { useGetPlansQuery } from '../../../../feature/plan/plan-slice'
import { useGetUserQuery } from '../../../../feature/user/user-slice'

interface StudentFormProps {
  onCloseModalEdit: () => void
  userId: string
}

const UserDataSchema = z.object({
  name: z.string().min(1),
  weight: z.number(),
  cpf: z
    .string()
    .max(14, 'Quantidade máxima é 14!')
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido!'),
  age: z.number(),
  planId: z.string().uuid(),
  startDateForPlan: z.date().nullable(),
})

type UserDataForm = z.infer<typeof UserDataSchema>

export function StudentForm({ onCloseModalEdit, userId }: StudentFormProps) {
  const { data: plans } = useGetPlansQuery()
  const { data: user, isLoading } = useGetUserQuery(userId)

  console.log(isLoading)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDataForm>({
    resolver: zodResolver(UserDataSchema),
    defaultValues: {
      age: user?.age,
      cpf: user?.cpf,
      name: user?.name,
      planId: user?.planId,
      startDateForPlan: new Date(user?.startDateForPlan!),
      weight: user?.weight,
    },
  })

  function handleEditStudentForm(data: UserDataForm) {}

  return (
    <form
      action=""
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(handleEditStudentForm)}
    >
      <input
        placeholder="Nome do aluno"
        className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
        {...register('name')}
        required
      />

      <input
        placeholder="Idade do aluno"
        className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
        {...register('age', { valueAsNumber: true })}
        required
      />

      <input
        placeholder="Peso do aluno"
        className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
        {...register('weight', { valueAsNumber: true })}
        required
      />

      <input
        type="text"
        placeholder="CPF do aluno"
        className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
        {...register('cpf')}
        required
      />

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
        _focus={{ ringColor: 'purple.700' }}
        _placeholder={{ opacity: '0.7' }}
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

      <input
        type="date"
        id="startDateForPlan"
        className="px-2 py-3 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
        {...register('startDateForPlan', { valueAsDate: true })}
      />

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
