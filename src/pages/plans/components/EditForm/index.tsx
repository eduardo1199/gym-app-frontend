import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Form } from 'src/components/Form'
import { useGetPlanQuery, useUpdatePlanMutation } from 'src/feature/plan/plan-slice'
import { z } from 'zod'
import { CurrencyInput } from 'react-currency-mask';
import { useToast } from '@chakra-ui/react'

const FormPlanSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório.' }).nullable(),
  plan_month_time: z.coerce
    .number({ required_error: 'Campo obrigatório' })
    .min(0, 'O campo do tempo do plano precisa ser maior que 0.').nullable(),
  price: z.number({
    required_error: 'Campo obrigatório.',
    invalid_type_error: 'Campo inválido',
  }).nullable(),
})

type FormPlanEditData = z.infer<typeof FormPlanSchema>

interface FormEditPlanProps {
  onCloseModalEdit: () => void
  planId: string
}

export function FormEditPlan({
  onCloseModalEdit,
  planId
}: FormEditPlanProps) {
  const [updatePlanFn] = useUpdatePlanMutation()
  const { data } = useGetPlanQuery(planId)

  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<FormPlanEditData>({
    resolver: zodResolver(FormPlanSchema),
    values: {
      name: data?.plan.name!,
      plan_month_time: data?.plan.plan_month_time!,
      price: Number(data?.plan.price!) / 100
    }
  })

  const toast = useToast()

  async function handleEditPlan(data: FormPlanEditData) {
    const { name, plan_month_time, price } = data

    const response = await updatePlanFn({
      planData: {
        name: name!,
        plan_month_time: plan_month_time!,
        price: Number(price) * 100,
      },
      planId
    })

    if(response.error) {
      toast({
        title: 'Error ao editar plano.',
        status: 'error',
        isClosable: true,
      })

      return
    }

    toast({
      title: 'Plano editado com sucesso.',
      status: 'success',
      isClosable: true,
    })
    
    onCloseModalEdit()
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleEditPlan)}
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
                  value={field.value!}
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
          onClick={onCloseModalEdit}
          className="bg-secondary-orange p-2 rounded text-base font-bold text-white hover:bg-orange-400 transition-colors focus:outline-none focus:ring focus:ring-orange-300"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="bg-primary-yellow p-2 rounded text-base font-bold text-white hover:bg-secondary-yellow transition-colors focus:outline-none focus:ring focus:ring-yellow-300"
        >
          Editar
        </button>
      </div>
    </form>
  )
}
