export interface UserData {
	name: string
	department?: string
	password: string
	role: 'admin'
	dateIn: Date
	dateOut?: Date
}
