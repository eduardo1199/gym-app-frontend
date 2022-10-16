import { useGetAdminQuery } from '../../feature/admin/admin-slice';

export default function Dashboard() {
  const { data: admin, isLoading } = useGetAdminQuery();

  if(isLoading) return <h1>Loading...</h1>;

  return (
    <h1>{admin?.name}</h1>
  )
}