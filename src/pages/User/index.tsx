import { useGetUserQuery } from '../../feature/user/user-slice';


import Cookies from 'universal-cookie';

export default function User() {
  const cookies = new Cookies();

  const { data: userData, isLoading } = useGetUserQuery(cookies.get('user'));

  if(isLoading) return <h1>Loading...</h1>;

  return (
    <h1>{userData.age}</h1>
  )
}