import { FormControl, Switch, Toast, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Form } from 'src/components/Form'
import { useCreateMachineMutation } from 'src/feature/machine/machine-slice'
import { z } from 'zod'

const CreateMachineSchema = z.object({
  name: z.string().trim().min(4, 'Precisa ter no mínimo 4 caracteres.'),
  description: z
    .string()
    .trim()
    .min(10, 'Precisa ter no mínimo 10 caracteres.'),
  maintenance: z.boolean().default(false),
})

type CreateMachineData = z.infer<typeof CreateMachineSchema>

interface FormRegisterMachineProps {
  onCloseModalRegister: () => void
}

export function FormRegisterMachine({
  onCloseModalRegister,
}: FormRegisterMachineProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateMachineData>({
    resolver: zodResolver(CreateMachineSchema),
  })

  const [createMachineFn] = useCreateMachineMutation()

  const toast = useToast()

  async function handleCreateMachine(data: CreateMachineData) {
    const { name, description, maintenance } = data

    const response = await createMachineFn({
      description,
      maintenance,
      name,
    })

    if (response.error) {
      toast({
        status: 'success',
        title: 'Maquinário editado com sucesso!',
        duration: 9000,
        isClosable: true,
      })

      return
    }

    Toast({
      colorScheme: 'green',
      title: 'Maquinário cadastrado com sucesso!',
      isClosable: true,
    })

    onCloseModalRegister()
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(handleCreateMachine)}
    >
      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="name">Nome do maquinário</Form.InputLabel>
        <Form.Input
          id="name"
          placeholder="nome do maquinário"
          {...register('name')}
        />
        <Form.InputError>{errors.name?.message}</Form.InputError>
      </div>

      <div className="flex flex-col gap-2">
        <Form.InputLabel htmlFor="age">Descrição</Form.InputLabel>
        <Form.Textearea
          id="description"
          placeholder="descrição do maquinário"
          rows={6}
          {...register('description')}
        />
        <Form.InputError>{errors.description?.message}</Form.InputError>
      </div>

      <Controller
        control={control}
        name="maintenance"
        render={({ field: { value, onChange } }) => {
          return (
            <FormControl className="flex flex-col gap-2">
              <Form.InputLabel htmlFor="maintenance">
                Precisa de manutenção
              </Form.InputLabel>

              <div className="flex gap-4 items-center">
                <Switch
                  id="maintenance"
                  isChecked={value}
                  onChange={(event) => onChange(event.currentTarget.checked)}
                />
                <span className="text-white font-semibold">
                  {value ? 'Sim' : 'Não'}
                </span>

                <Form.InputError>{errors.maintenance?.message}</Form.InputError>
              </div>
            </FormControl>
          )
        }}
      />

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
