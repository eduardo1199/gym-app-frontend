import { Select } from '@chakra-ui/select'

interface StudentFormProps {
  onCloseModalEdit: () => void
}

export function StudentForm({ onCloseModalEdit }: StudentFormProps) {
  function handleEditStudentForm() {}

  return (
    <form
      action=""
      className="flex flex-col gap-2"
      onSubmit={handleEditStudentForm}
    >
      <label htmlFor="name" className="text-white font-semibold">
        Nome
      </label>
      <input
        type="text"
        id="name"
        placeholder="Nome do aluno"
        className="p-2 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
      />

      <label htmlFor="age" className="text-white font-semibold">
        Idade
      </label>
      <input
        type="number"
        id="age"
        placeholder="Idade do aluno"
        className="p-2 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
      />

      <label htmlFor="weight" className="text-white font-semibold">
        Peso
      </label>
      <input
        type="number"
        id="weight"
        placeholder="Peso do aluno"
        className="p-2 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
      />

      <label htmlFor="cpf" className="text-white font-semibold">
        CPF
      </label>
      <input
        type="text"
        id="cpf"
        placeholder="CPF do aluno"
        className="p-2 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
      />

      <label htmlFor="plan" className="text-white font-semibold">
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
        border="none"
        _focus={{ ringColor: 'purple.700' }}
        _placeholder={{ opacity: '0.7' }}
      >
        <option
          value="option1"
          className="placeholder:text-white placeholder:text-sm !bg-primary-purple font-semibold text-sm"
        >
          Option 1
        </option>
        <option
          value="option2"
          className="placeholder:text-white placeholder:text-sm !bg-primary-purple font-semibold text-sm"
        >
          Option 2
        </option>
        <option
          value="option3"
          className="placeholder:text-white placeholder:text-sm !bg-primary-purple font-semibold text-sm"
        >
          Option 3
        </option>
      </Select>

      <label htmlFor="startDateForPlan" className="text-white font-semibold">
        Data de início do plano
      </label>
      <input
        type="date"
        id="startDateForPlan"
        className="p-2 rounded placeholder:text-white placeholder:text-sm placeholder:text-opacity-60 bg-primary-purple brightness-125 text-white text-sm focus:outline-none focus:ring focus:ring-purple-700"
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
