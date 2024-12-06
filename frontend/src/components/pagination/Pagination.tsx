import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageSizeChange: (pageSize: number) => void
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange
}) => {
  const options = [5, 10, 15, 20] // Các tùy chọn pageSize

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handleClick = (page: number) => {
    if (page !== currentPage) onPageChange(page)
  }

  return (
    <div className='flex items-center justify-center gap-4'>
      <div className='flex items-center justify-center space-x-2'>
        <Button
          className='rounded-md bg-gray-200 px-3 py-1 text-gray-800 hover:bg-gray-300'
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </Button>
        {pages.map((page) =>
          Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages ? (
            <Button
              key={page}
              className={`rounded-md px-3 py-1 ${
                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => handleClick(page)}
            >
              {page}
            </Button>
          ) : (
            Math.abs(page - currentPage) === 3 && (
              <span key={`ellipsis-${page}`} className='px-2'>
                ...
              </span>
            )
          )
        )}
        <Button
          className='rounded-md bg-gray-200 px-3 py-1 text-gray-800 hover:bg-gray-300'
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &gt;
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='w-28' variant='outline'>
            {pageSize} / page.
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((option) => (
            <DropdownMenuItem key={option} onClick={() => onPageSizeChange(option)}>
              {option} / page.
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Pagination
