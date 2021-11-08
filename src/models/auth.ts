export interface UserData {
	name: string
	uid?: number
	department?: string
	password: string
	role: 'admin' | 'guest' | 'recruiter' | 'coord' | 'apply'
	dateIn: string
	dateOut?: string
}
