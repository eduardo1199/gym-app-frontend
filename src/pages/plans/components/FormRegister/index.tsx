import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from 'src/components/Form'
import { z } from 'zod'

const FormPlanSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório.' }),
  plan_month_time: z
    .number({ invalid_type_error: 'Campo inválido' })
    .min(1, 'O campo do tempo do plano precisa ser maior que 0.'),
  price: z.number({
    required_error: 'Campo obrigatório.',
    invalid_type_error: 'Campo inválido',
  }),
})

type FormPlanCreateData = z.infer<typeof FormPlanSchema>

interface FormRegisterPlanProps {
  onCloseModalRegister: () => void
}

export function FormRegisterPlan({
  onCloseModalRegister,
}: FormRegisterPlanProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormPlanCreateData>({
    resolver: zodResolver(FormPlanSchema),
  })

  async function handleCreatePlan(data: FormPlanCreateData) {
    console.log(data)
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreatePlan)}
    >
      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="name">Nome do plano</Form.InputLabel>
        <Form.Input
          id="name"
          placeholder="nome do plano"
          {...register('name')}
        />
        <Form.InputError>{errors.name?.message}</Form.InputError>
      </div>

      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="age">Período do plano</Form.InputLabel>
        <Form.Input
          id="description"
          placeholder="período do plano (em meses)"
          type="number"
          {...register('plan_month_time')}
        />
        <Form.InputError>{errors.plan_month_time?.message}</Form.InputError>
      </div>

      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="age">Preço do plano</Form.InputLabel>
        <Form.Input
          id="description"
          placeholder="preço em R$"
          type=""
          {...register('price')}
        />
        <Form.InputError>{errors.price?.message}</Form.InputError>
      </div>

      <div className="flex justify-between my-4">
        <button
          type="button"
          onClick={onCloseModalRegister}
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
