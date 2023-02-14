import { AnchorHTMLAttributes, ReactElement } from 'react';

import { NavLink, useLocation, useParams } from 'react-router-dom'

interface LinkNavigatorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactElement;
  route: string;
  href: string;
}

export function LinkNavigator({ icon, route, href, ...props }: LinkNavigatorProps) {
  const { pathname } = useLocation();

  const activeLink = href === pathname

  return (
    <NavLink to={href}>
      <a
        className={`flex items-center gap-8 px-3 py-2 rounded-xl text-base ${activeLink ? 'text-primary-purple font-extrabold bg-primary-white': 'font-semibold text-primary-white'} hover:text-primary-purple hover:font-extrabold hover:bg-primary-white transition duration-400`}
        {...props}
      >
        <>
          {icon}
          <p className="text-right">{route}</p>
        </>
      </a>
    </NavLink>
  )
}