import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import authFetch from 'utils/tools'

/**
 * Hook de departamentos
 * @description Hook para obtener departamentos desde db
 * @param setDepartments
 */
const useDepartments = (
	history: RouteComponentProps['history'],
	setDepartments: React.Dispatch<React.SetStateAction<Department[]>>
): void => {
	useEffect(() => {
		// PETICION
		authFetch(history, 'http://localhost:5000/departments', { method: 'GET' })
			.then((res) => res?.json())
			.then((deps) => {
				const list = (deps?.data as (string | null | number)[][])?.map((dep) => ({
					id: dep[0] as number,
					name: dep[1] as string,
					total: dep[2] as number,
				}))

				// ACTUALIZAR
				setDepartments(list ?? [])
			})
	}, [])
}

export default useDepartments
