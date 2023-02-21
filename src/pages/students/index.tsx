import { Header } from "../../components/Header";
import { TableRow } from "../../components/Table/TableRow";
import { useGetUsersQuery } from "../../feature/user/user-slice";
import { dateFormat } from "../../utils";

export function Students() {
  const { data: users } = useGetUsersQuery();

  return (
    <div className="p-8">
      <Header visibleSearchBar />
      <div className="h-screen mt-10">
        <table className="w-full">
          <tbody>
            {users?.map((user) => {
              return (
                <TableRow 
                  key={user.id}
                  active={user.isActive}
                  ageUser={user.age}
                  id={user.id}
                  name={user.name}
                  startDatePlan={dateFormat(user.startDateForPlan)}
                  weight={user.weight}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}