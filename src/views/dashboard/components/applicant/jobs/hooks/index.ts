import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import authFetch from 'utils/tools'

/**
 * @description Obtener todas las aplicaciones asignadas al usuario
 * @param setJobs
 */
const useJobs = (
	updates: number,
	setJobs: React.Dispatch<React.SetStateAction<JobApply[]>>,
	history: RouteComponentProps['history'],
	uid?: number
): void => {
	useEffect(() => {
		if (uid) {
			// PETICION
			authFetch(history, `http://localhost:5000/apply/${uid}`, {
				method: 'GET',
			})
				.then((res) => res?.json())
				.then((jobs) => {
					if (jobs.success) {
						const newJobs: JobApply[] = (jobs?.data as string[])?.map((job) => ({
							userId: +job[1],
							cui: +job[7],
							name: job[8],
							lastName: job[9],
							email: job[10],
							address: job[11],
							phone: job[12],
							department: job[23],
							date: job[14],
							jobName: job[16],
							applyId: +job[6],
							cv: job[13] as unknown as File,
							status: job[3],
						}))

						setJobs(newJobs ?? [])
					} else window.Snack('Error al leer puestos.')
				})
				.catch((err) => window.Snack(err.toString()))
		}
	}, [updates, uid])
}

export default useJobs
