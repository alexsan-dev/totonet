import React from 'react'

/*
 * Buscar puesto
 * @description Crea un filtro en el estado de puestos
 * @param user
 */
const searchJob = (
	ev: React.ChangeEvent<HTMLInputElement>,
	setJobs: React.Dispatch<React.SetStateAction<Job[]>>,
	jobs: Job[]
): void => {
	const { value } = ev.target
	const val = value
		.toLowerCase()
		.trim()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')

	setJobs(() => {
		const newJobs = []
		for (let i = 0, { length } = jobs; i < length; i++) {
			if (
				jobs[i].name
					.toLowerCase()
					.trim()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.indexOf(val) !== -1 ||
				jobs[i].department
					.toLowerCase()
					.trim()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.indexOf(val) !== -1 ||
				jobs[i].salary
					.toString()
					.toLowerCase()
					.trim()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.indexOf(val) !== -1 ||
				jobs[i].categories
					.join('')
					.toLowerCase()
					.trim()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.indexOf(val) !== -1
			)
				newJobs.push(jobs[i])
		}

		return newJobs
	})
}

/*
 * Filtrar puesto
 * @description Crea un filtro en el estado de puestos
 * @param user
 */
export const filterJobs = (
	filter: keyof Job,
	setJobs: React.Dispatch<React.SetStateAction<Job[]>>
): void => {
	setJobs((jobs) => {
		return [...jobs].sort((jobA, jobB) =>
			typeof jobA[filter] === 'number'
				? jobA.salary - jobB.salary
				: jobA[filter].toString().localeCompare(jobB[filter].toString())
		)
	})
}

export default searchJob
