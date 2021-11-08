export interface JobApply {
	id: number
	cui: number
	name: string
	lastName: string
	email: string
	address: string
	phone: string
	date: string
	department: string
	applyId?: number
}

export interface JobScore {
	id: number
	score: number
}
