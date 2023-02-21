import { Tooltip } from "@chakra-ui/react";

import { DotsThreeVertical } from "phosphor-react";

interface TableRowProps {
  name: string;
  startDatePlan: string
  ageUser: string
  weight: string
  id: string
  active: boolean
}

export function TableRow(props: TableRowProps) {
  return (
    <>
      <tr className="bg-primary-white border border-tertiary-pink border-collapse rounded-t-2xl rounded-b-2xl">
        <td className="py-5 px-3">
          <span className="text-base text-primary-gray font-semibold">
            {props.name}
          </span>
        </td>
        <td>
          <span className="font-extrabold text-base text-primary-blue">
            {props.startDatePlan}
          </span>
        </td>
        <td>
          <span className="text-base text-primary-gray font-semibold">
            {props.ageUser} anos
          </span>
        </td>
        <td>
          <span className="text-base text-primary-gray font-semibold">
            {props.weight}kg
          </span>
        </td>
        <td>             
          <Tooltip hasArrow label='Usuário está com plano vencido' bg={`${props.active ? 'green.600' : 'red.600'}`}>
            <button className={`w-4 h-4 ${props.active ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
          </Tooltip>
        </td>
        <td className="rounded">
          <Tooltip hasArrow label='Ações' bg='purple.600'>
            <button type="button" className="hover:brightness-75">
              <DotsThreeVertical size={32} weight="bold" className="fill-primary-purple" />
            </button>
          </Tooltip>
        </td>
      </tr>
      <tr>
        <td className="py-4"></td>
      </tr>
    </>
  )
}