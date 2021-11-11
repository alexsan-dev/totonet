interface Job {
	jobId: number
	userId: number
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
	jobId: number
	userId: number
	cui?: number
	name?: string
	lastName?: string
	email?: string
	address?: string
	phone?: string
	department?: string
	date?: string
	jobName?: string
	applyId?: number
	cv?: File | Blob | null
	status?: string
}

interface JobScore {
	id: number
	score: number
}
