import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router'
import authFetch from 'utils/tools'

/**
 * @description Obtener todas las aplicaciones asignadas al usuario
 * @param setJobs
 */
const useJobs = (
	setJobs: React.Dispatch<React.SetStateAction<JobApply[]>>,
	history: RouteComponentProps['history'],
	uid?: number
): void => {
	useEffect(() => {
		if (uid) {
			// PETICION
			authFetch(
				history,
				'http://localhost:5000/jobs/apply/all',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ user: { uid } }),
				},
				true
			)
				.then((res) => res?.json())
				.then((jobs) => {
					if (jobs.success) {
						const nextJobs: JobApply[] = (jobs?.data as string[])?.map((job) => ({
							id: +job[0],
							cui: +job[3],
							name: job[4],
							lastName: job[5],
							email: job[6],
							address: job[7],
							phone: job[8],
							date: job[10],
							jobName: job[12],
							cv: job[9] as unknown as File,
							applyId: +job[2],
							department: '',
						}))

						setJobs(nextJobs ?? [])
					} else window.Snack('Error al leer puestos.')
				})
				.catch((err) => window.Snack(err.toString()))
		}
	}, [uid])
}

export default useJobs
