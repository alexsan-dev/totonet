import { useEffect } from 'react'
import authFetch from 'utils/tools'

/**
 * Hook de usuarios
 * @description Hook para obtener usuarios desde db
 * @param setUsers
 */
const useUsers = (
	setUsers: React.Dispatch<React.SetStateAction<User[]>>,
	updateCounter: number
): void => {
	useEffect(() => {
		// PETICION
		authFetch('http://localhost:5000/users', { method: 'GET' })
			.then((res) => res?.json())
			.then((users) => {
				const list = (users.data as (string | null | number)[][])?.map((user) => ({
					role: user[0] as UserRole,
					name: user[1] as string,
					password: user[2] as string,
					active: (user[3] as number) === 1,
					id: user[4] as number,
					dateOut: user[5] as string | null,
					dateIn: user[6] as string | null,
					department: user[7] as number,
					departmentName: user[9] as string,
				}))

				// ACTUALIZAR
				setUsers(list ?? [])
			})
	}, [updateCounter])
}

export default useUsers
