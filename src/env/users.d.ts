interface User {
	role: UserRole
	name: string
	password: string
	active: boolean
	id: number
	dateOut: string | null
	dateIn: string | null
	department: number
	departmentName?: string
}

interface UserToken {
	token?: string
	role?: UserRole
	uid?: number
}

type UserRole = 'admin' | 'guest' | 'coord' | 'recruiter' | 'apply'
