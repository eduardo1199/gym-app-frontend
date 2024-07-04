import { Select } from '@chakra-ui/select'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { useGetPlansQuery } from '../../../../feature/plan/plan-slice'
import { useCreateUserMutation } from '../../../../feature/user/user-slice'
import { useToast } from '@chakra-ui/react'
import { Form } from 'src/components/Form'

interface StudentFormProps {
  onCloseModalEdit: () => void
}

const UserDataSchema = z.object({
  name: z.string().min(1, 'Seu nome é obrigatório'),
  weight: z
    .number()
    .min(0, 'Seu peso é obrigatório e precisa ser maior que zero.'),
  cpf: z
    .string()
    .max(14, 'Quantidade máxima é 14!')
    .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido!'),
  age: z.number().min(15, 'Sua idade é obrigatória'),
  planId: z.string().uuid(),
  start_plan_date: z.string(),
})

type UserDataForm = z.infer<typeof UserDataSchema>

export function RegisterFormStudent({ onCloseModalEdit }: StudentFormProps) {
  const { data: dataPlans } = useGetPlansQuery()

  const toast = useToast()
  const [handleCreateUser] = useCreateUserMutation()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataForm>({
    resolver: zodResolver(UserDataSchema),
  })

  async function handleCreateStudent(data: UserDataForm) {
    const userData = {
      ...data,
      start_plan_date: new Date(data.start_plan_date).toISOString(),
    }

    const response = await handleCreateUser(userData)

    if (response.error) {
      toast({
        colorScheme: 'danger',
        title: 'Error ao cadastrar usuário!',
        isClosable: true,
      })

      return
    }

    toast({
      colorScheme: 'green',
      title: 'Usuário cadastrado com sucesso!',
      isClosable: true,
    })

    reset()
    onCloseModalEdit()
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateStudent)}
    >
      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="name">Nome</Form.InputLabel>
        <Form.Input
          id="name"
          placeholder="Nome do aluno"
          {...register('name')}
        />
        <Form.InputError>{errors.name?.message}</Form.InputError>
      </div>

      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="age">Idade</Form.InputLabel>
        <Form.Input
          id="age"
          placeholder="Idade do aluno"
          {...register('age', { valueAsNumber: true })}
        />
        <Form.InputError>{errors.age?.message}</Form.InputError>
      </div>

      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="weight">Peso</Form.InputLabel>
        <Form.Input
          id="weight"
          placeholder="Peso do aluno"
          {...register('weight', { valueAsNumber: true })}
        />
        <Form.InputError>{errors.weight?.message}</Form.InputError>
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
        <Form.InputError>{errors.cpf?.message}</Form.InputError>
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
          {dataPlans?.plans?.map((plan) => {
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
        <Form.InputError>{errors.planId?.message}</Form.InputError>
      </div>

      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="startDateForPlan">
          Data de Início do plano
        </Form.InputLabel>
        <Form.Input
          id="startDateForPlan"
          type="datetime-local"
          {...register('start_plan_date')}
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
