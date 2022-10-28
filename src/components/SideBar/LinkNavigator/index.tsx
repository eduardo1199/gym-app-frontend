import { AnchorHTMLAttributes, ReactElement } from 'react';

import Router from 'next/router';

import Link from "next/link";

interface LinkNavigatorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactElement;
  route: string;
  href: string;
}

export function LinkNavigator({ icon, route, href, ...props }: LinkNavigatorProps) {
  const isActive = Router.asPath === href;

  return (
    <Link href={href} passHref>
      <a
        className={`flex items-center gap-8 px-3 py-2 rounded-xl text-base ${isActive ? 'text-primary-purple font-extrabold bg-primary-white': 'font-semibold text-primary-white'} hover:text-primary-purple hover:font-extrabold hover:bg-primary-white transition duration-400`}
        {...props}
      >
        <>
          {icon}
          <p className="text-right">{route}</p>
        </>
      </a>
    </Link>
  )
}