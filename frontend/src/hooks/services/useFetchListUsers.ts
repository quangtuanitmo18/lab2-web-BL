import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { queryResources } from '../resources/query.resources'
import userService from 'src/services/user.service'
import { User, UserSearch } from 'src/types/user/user.type'

export default function useFetchListUsers(params?: UserSearch) {
  const {
    data: listUsersResponse,
    isError,
    error,
    refetch,
    isPending
  } = useQuery({
    queryKey: [queryResources.user.list, params],
    queryFn: () => userService.getListUsers(params)
  })

  if (isError) {
    toast('Load list users thất bại', {
      position: 'top-right',
      autoClose: 1000
    })
  }
  return {
    listUsers: listUsersResponse?.data.data.data as User[],
    pagination: listUsersResponse?.data.data.pagination,
    isPendingFetchListUsers: isPending,
    refetchListUsers: refetch,
    isErrorFetchListUsers: isError,
    error
  }
}
