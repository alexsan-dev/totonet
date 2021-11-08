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
	filter: keyof Job | keyof JobApply,
	setJobs:
		| React.Dispatch<React.SetStateAction<Job[]>>
		| React.Dispatch<React.SetStateAction<JobApply[]>>
): void => {
	setJobs((jobs: unknown) => {
		return [...(jobs as Job[])].sort((jobA, jobB) =>
			typeof jobA[filter as keyof Job] === 'number'
				? (jobA[filter as keyof Job] as number) - (jobB[filter as keyof Job] as number)
				: jobA[filter as keyof Job].toString().localeCompare(jobB[filter as keyof Job].toString())
		)
	})
}

export default searchJob
