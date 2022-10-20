import { useGetUserQuery } from '../feature/user/user-slice';

import Cookies from 'universal-cookie';

export function CardStatistics() { 
  const cookies = new Cookies();

  const { data: userData, isLoading } = useGetUserQuery(cookies.get('user'));

  return (
    <h1>{userData.registrationDate}</h1>
  )
}