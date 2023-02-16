import { Button, Tooltip } from "@chakra-ui/react";
import { DotsThreeVertical } from "phosphor-react";
import { Header } from "../../components/Header";
import { useGetUsersQuery } from "../../feature/user/user-slice";

export function Students() {
  const { data: Users } = useGetUsersQuery();

  return (
    <div className="p-8">
      <Header visibleSearchBar />
      {/* {JSON.stringify(Users, null, 2)} */}
      <div className="h-screen mt-10">
        <table className="w-full">
          <tbody>
            <tr className="bg-primary-white border border-tertiary-pink border-collapse rounded-t-2xl rounded-b-2xl">
              <td className="py-5 px-3">
                <span className="text-base text-primary-gray font-semibold">
                  Eduardo Soares de Araujo Aquino
                </span>
              </td>
              <td>
                <span className="font-extrabold text-base text-primary-blue">
                  16/02/2023
                </span>
              </td>
              <td>
                <span className="text-base text-primary-gray font-semibold">
                  23 anos
                </span>
              </td>
              <td>
                <span className="text-base text-primary-gray font-semibold">
                  68.8kg
                </span>
              </td>
              <td>             
                <Tooltip hasArrow label='Usuário está com plano vencido' bg='red.600'>
                  <button className="w-4 h-4 bg-red-600 rounded-full"/>
                </Tooltip>
              </td>
              <td className="rounded">
                <DotsThreeVertical size={32} weight="bold" className="fill-primary-purple" />
              </td>
            </tr>
            <tr>
              <td className="py-4"></td>
            </tr>
            <tr className="bg-primary-white border border-tertiary-pink border-collapse rounded-t-2xl rounded-b-2xl">
              <td className="py-5 px-3">
                <span className="text-base text-primary-gray font-semibold">
                  Eduardo Soares de Araujo Aquino
                </span>
              </td>
              <td>
                <span className="font-extrabold text-base text-primary-blue">
                  16/02/2023
                </span>
              </td>
              <td>
                <span className="text-base text-primary-gray font-semibold">
                  23 anos
                </span>
              </td>
              <td>
                <span className="text-base text-primary-gray font-semibold">
                  68.8kg
                </span>
              </td>
              <td>             
                <Tooltip hasArrow label='Usuário está em dia' bg='green.600'>
                  <button className="w-4 h-4 bg-green-600 rounded-full"/>
                </Tooltip>
              </td>
              <td className="rounded">
                <DotsThreeVertical size={32} weight="bold" className="fill-primary-purple" />
              </td>
            </tr>
            <tr>
              <td className="py-4" />
            </tr>
            <tr className="bg-primary-white border border-tertiary-pink border-collapse rounded-t-2xl rounded-b-2xl">
              <td className="py-5 px-3">
                <span className="text-base text-primary-gray font-semibold">
                  Eduardo Soares de Araujo Aquino
                </span>
              </td>
              <td>
                <span className="font-extrabold text-base text-primary-blue">
                  16/02/2023
                </span>
              </td>
              <td>
                <span className="text-base text-primary-gray font-semibold">
                  23 anos
                </span>
              </td>
              <td>
                <span className="text-base text-primary-gray font-semibold">
                  68.8kg
                </span>
              </td>
              <td>             
                <Tooltip hasArrow label='Usuário está com plano vencido' bg='red.600'>
                  <button className="w-4 h-4 bg-red-600 rounded-full"/>
                </Tooltip>
              </td>
              <td className="rounded">
                <DotsThreeVertical size={32} weight="bold" className="fill-primary-purple" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}