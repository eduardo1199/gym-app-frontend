import { useLocation } from "react-router-dom";
import { useGetAdminQuery } from "../../feature/admin/admin-slice";
import { capitalizeFirstLetter } from "../../utils";

import { InputSearch } from "./Input";
import { Logout } from "./Logout";

interface HeaderProps {
  visibleSearchBar: boolean;
}

export function Header({ visibleSearchBar }: HeaderProps) {
  const { pathname } = useLocation();

  const title = capitalizeFirstLetter(pathname.split('/')[1]);

  const { data: admin } = useGetAdminQuery();

  return (
    <header className="flex h-[50px] justify-between px-5 mb-4"> 
      <h1 className="font-bold text-3xl text-secondary-blue">{title}</h1>
      <div className="flex gap-10">

        {visibleSearchBar && (
          <InputSearch />
        )}

        <Logout userName={admin?.name ?? ''} />
      </div>
    </header>
  )
}