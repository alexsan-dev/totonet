export interface JobApply {
	userId: number
	cui: number
	name: string
	lastName: string
	email: string
	address: string
	phone: string
	date: string
	department: string
	applyId?: number
	cv?: string
}

export interface JobScore {
	id: number
	score: number
}
