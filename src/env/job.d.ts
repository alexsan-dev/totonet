interface Job {
	name: string
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
