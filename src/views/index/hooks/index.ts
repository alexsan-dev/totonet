import { useEffect } from 'react'

/**
 * Hook de puestos
 * @description Hook para obtener puestos desde db
 * @param setDepartments
 */
const useJobs = (setJobs: React.Dispatch<React.SetStateAction<Job[]>>, updates: number): void => {
	useEffect(() => {
		// PETICION
		fetch('http://localhost:5000/jobs', { method: 'GET' })
			.then((res) => res?.json())
			.then((jobs) => {
				if (jobs.success) {
					const newJobs: { [id: string]: Job } = {}
					jobs?.data?.forEach((job: string[]) => {
						// ASIGNAR PROPIEDADES
						if (job[8] in newJobs) {
							// INSERTAR CATEGORIAS
							if (!newJobs[job[8] as string]?.categories.includes(job[15]))
								newJobs[job[8] as string]?.categories.push(job[15])

							// INSERTAR REQUERIMIENTOS
							const reqIndex = newJobs[job[8] as string]?.requirements.findIndex(
								(req) => req.name === job[20]
							)
							if (reqIndex >= 0) {
								// INSERTAR FORMATOS
								if (!newJobs[job[8] as string]?.requirements[reqIndex].formats.includes(job[27]))
									newJobs[job[8] as string]?.requirements[reqIndex].formats.push(job[27])
							} else {
								newJobs[job[8] as string]?.requirements.push({
									name: job[20],
									size: +job[21],
									required: +job[22] === 1,
									formats: [job[27]],
								})
							}
						}
						// CREAR
						else
							newJobs[job[8] as string] = {
								id: +job[7],
								name: job[8],
								salary: +job[10],
								image: job[9],
								department: job[4],
								categories: [job[15]],
								score: job[30] ? +job[30] : 0,
								requirements: [
									{
										name: job[20],
										size: +job[21],
										required: +job[22] === 1,
										formats: [job[27]],
									},
								],
							}
					})
					setJobs(Object.values(newJobs))
				} else window.Snack('Error al leer puestos.')
			})
			.catch((err) => window.Snack(err.toString()))
	}, [updates])
}

export default useJobs
