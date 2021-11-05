interface Job {
	id: number
	name: string
	score: number
	salary: number
	image: string
	department: string
	categories: string[]
	requirements: Requirement[]
}

interface Requirement {
	name: string
	size: number
	required: boolean
	formats: string[]
}

interface JobApply {
	id: number
	cui?: number
	name?: string
	lastName?: string
	email?: string
	address?: string
	phone?: string
	department?: string
	cv?: File | Blob | null
}
