import LoadingSpin from 'src/components/loading'
import useFetchListUsers from 'src/hooks/services/useFetchListUsers'
import { DataTable } from './components/userTable/dataTable'
import { columns } from './components/userTable/columns'
import useMutationDeleteUser from 'src/hooks/services/useMutationDeleteUser'
import { useMemo, useState } from 'react'
import { Input } from 'src/components/ui/input'
import { debounce } from 'lodash'

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const [search, setSearch] = useState('')

  const { listUsers, isPendingFetchListUsers, pagination } = useFetchListUsers({
    limit: pageSize,
    page: pageIndex,
    search
  })

  const handlePaginationChange = (updater: any) => {
    const { pageIndex, pageSize } = updater as { pageIndex: number; pageSize: number }
    setPageIndex(pageIndex)
    setPageSize(pageSize)
  }

  return (
    <div className='container'>
      <div className='flex flex-col items-center justify-between py-4'>
        <Input
          placeholder='Filter...'
          onChange={debounce((e) => setSearch(e.target.value), 500)}
          className='max-w-sm'
        />
        <DataTable
          isPendingFetchListUsers={isPendingFetchListUsers}
          pagination={pagination}
          columns={columns}
          data={listUsers}
          pageIndex={pageIndex}
          pageSize={pageSize}
          handlePaginationChange={handlePaginationChange}
          setPageIndex={setPageIndex}
        />
      </div>
    </div>
  )
}

export default Home
