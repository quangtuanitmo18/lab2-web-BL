import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from 'src/components/ui/button'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Input } from 'src/components/ui/input'
import { Label } from 'src/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select'
import { queryResources } from 'src/hooks/resources/query.resources'
import useFetchListUsers from 'src/hooks/services/useFetchListUsers'
import useFetchUserById from 'src/hooks/services/useFetchUserById'
import useMutationCreateUser from 'src/hooks/services/useMutationCreateUser'
import useMutationUpdateUser from 'src/hooks/services/useMutationUpdateUser'

interface DialogContentProps {
  dialogTitle: string
  dialogBtnTitle: string
  actionType: 'create' | 'update'
  userId?: string
}
const DialogContentUser = ({ dialogTitle, dialogBtnTitle, actionType, userId }: DialogContentProps) => {
  const [formDataUser, setFormDataUser] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    course: '',
    group: '',
    faculty: ''
  })

  const queryClient = useQueryClient()

  const { createUserMutate } = useMutationCreateUser()
  const { updateUserMutate } = useMutationUpdateUser()
  const { user, isPendingFetchUserByid } = useFetchUserById(userId as string)!
  const { refetchListUsers } = useFetchListUsers()

  const handleChangeDataUser = (e: any) => {
    const { name, value } = e.target
    setFormDataUser({
      ...formDataUser,
      [name]: value
    })
  }

  const handleActionSubmit = (e: any, actionType: 'create' | 'update', userId?: string) => {
    e.preventDefault()
    if (actionType === 'create') {
      createUserMutate(
        { user: formDataUser },
        {
          onSuccess: () => {
            toast.success('Create user successfully')
            refetchListUsers()
            setFormDataUser({
              firstName: '',
              lastName: '',
              middleName: '',
              course: '',
              group: '',
              faculty: ''
            })
          }
        }
      )
    } else if (actionType === 'update') {
      updateUserMutate(
        { userId: userId as string, body: formDataUser },
        {
          onSuccess: () => {
            toast.success('Update user successfully')
            queryClient.invalidateQueries({ queryKey: [queryResources.user.list] })
          }
        }
      )
    }
  }

  useEffect(() => {
    if (actionType === 'update' && user) {
      setFormDataUser({
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        course: user.course,
        group: user.group,
        faculty: user.faculty
      })
    }
  }, [userId, user])

  if (userId && isPendingFetchUserByid) return null

  return (
    <form>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='firstName' className='text-right'>
              firstName
            </Label>
            <Input
              id='firstName'
              name='firstName'
              value={formDataUser.firstName}
              onChange={handleChangeDataUser}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='lastName' className='text-right'>
              lastName
            </Label>
            <Input
              id='lastName'
              name='lastName'
              value={formDataUser.lastName}
              onChange={handleChangeDataUser}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='middleName' className='text-right'>
              middleName
            </Label>
            <Input
              id='middleName'
              name='middleName'
              value={formDataUser.middleName}
              onChange={handleChangeDataUser}
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='course' className='text-right'>
              course
            </Label>
            <Input
              id='course'
              name='course'
              value={formDataUser.course}
              onChange={handleChangeDataUser}
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='group' className='text-right'>
              group
            </Label>
            <Input
              id='group'
              name='group'
              value={formDataUser.group}
              onChange={handleChangeDataUser}
              className='col-span-3'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='faculty' className='text-right'>
              faculty
            </Label>
            <Input
              id='faculty'
              name='faculty'
              value={formDataUser.faculty}
              onChange={handleChangeDataUser}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={(e: any) => handleActionSubmit(e, actionType, userId)}>
            {dialogBtnTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  )
}

export default DialogContentUser
