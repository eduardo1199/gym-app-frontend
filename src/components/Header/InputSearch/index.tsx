import { MagnifyingGlass } from 'phosphor-react'

export function InputSearch() {
  return (
    <form>
      <label
        className="focus:outline-none xl:flex hidden h-10 w-[400px] gap-1 justify-between bg-secondary-pink items-center px-3 py-2 rounded-3xl text-primary-blue font-semibold"
        form="search"
      >
        <input
          type="text"
          id="search"
          className="bg-secondary-pink w-full focus:outline-none focus:ring-1 focus:ring-offset-secondary-purple"
          onChange={() => {}}
          placeholder="Pesquisar"
        />
        <MagnifyingGlass size="18px" />
      </label>
    </form>
  )
}
