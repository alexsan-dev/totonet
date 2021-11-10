export interface User {
	role: UserRole
	name: string
	password: string
	active: boolean
	id: number
	dateOut: string | null
	dateIn: string | null
	department: number
}

export type UserRole = 'admin' | 'guest' | 'coord' | 'recruiter' | 'apply'
