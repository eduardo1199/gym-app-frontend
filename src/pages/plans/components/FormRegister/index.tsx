import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Form } from 'src/components/Form'
import { useCreatePlanMutation } from 'src/feature/plan/plan-slice'
import { z } from 'zod'
import { CurrencyInput } from 'react-currency-mask';
import { useToast } from '@chakra-ui/react'

const FormPlanSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório.' }),
  plan_month_time: z.coerce
    .number({ required_error: 'Campo obrigatório' })
    .min(0, 'O campo do tempo do plano precisa ser maior que 0.'),
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
    control,
    formState: { errors }
  } = useForm<FormPlanCreateData>({
    resolver: zodResolver(FormPlanSchema),
  })

  const toast = useToast()
  const [createPlanFn] = useCreatePlanMutation()

  async function handleCreatePlan(data: FormPlanCreateData) {
    const { name, plan_month_time, price } = data

    const response = await createPlanFn({
      name,
      plan_month_time,
      price: Number(price) * 100,
    })

    if(response.error) {
      toast({
        title: 'Error ao cadastrar plano.',
        status: 'error',
        isClosable: true,
      })

      return
    }

    toast({
      title: 'Plano cadastrado com sucesso.',
      status: 'success',
      isClosable: true,
    })
    
    onCloseModalRegister()
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
        <Form.InputLabel htmlFor="plan_month_time">Período do plano</Form.InputLabel>
        <Form.Input
          {...register('plan_month_time')}
          placeholder='período do plano (em meses)'
          type='number'
        />
        <Form.InputError>{errors.plan_month_time?.message}</Form.InputError>
      </div>

      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="price">Preço do plano</Form.InputLabel>
        <Controller
          name="price"
          control={control}
          render={({ field }) => {
            return (
              <>
                <CurrencyInput
                  onChangeValue={(_, originalValue) => field.onChange(originalValue as Number)}
                  InputElement={
                    <Form.Input
                      id="price"
                      placeholder="preço em R$"
                    />
                  }
                  value={field.value}
                />
              </>
            )
          }}
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
