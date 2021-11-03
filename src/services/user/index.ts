import { User } from 'models/user'
import runSQL from 'utils/sql'
import express from 'express'

class UserService {
	/**
	 * Obtener usuario
	 * @description Obtener un usuario por nombre
	 * @param req
	 * @param res
	 * @returns
	 */
	public async deleteUser(req: express.Request, res: express.Response) {
		// PETICION
		const id: number = +req.params.id

		await runSQL(
			res,
			`UPDATE Users SET 
				active = 0,
				date_out = '${new Date().toLocaleDateString('en-GB')}'
			WHERE user_id = ${id}`,
		)
	}

	/**
	 * Borrar usuario
	 * @description Obtener un usuario por nombre
	 * @param req
	 * @param res
	 * @returns
	 */
	public async getUser(req: express.Request, res: express.Response) {
		// PETICION
		const id: number = +req.params.id
		await runSQL(res, `SELECT * FROM Users WHERE user_id = '${id}'`)
	}

	/**
	 * Crear usuarios
	 * @description Crear nuevo usuario
	 * @param req
	 * @param res
	 * @returns
	 */
	public async addUser(req: express.Request, res: express.Response) {
		// PETICION
		const user = req.body.user as User

		await runSQL(
			res,
			`INSERT INTO Users VALUES ('${user.role}', '${user.name}', '${
				user.password
			}', ${user.active ? 1 : 0}, users_seq.nextval, ${
				user.dateOut === null ? 'NULL' : `'${user.dateOut}'`
			}, ${user.dateIn === null ? 'NULL' : `'${user.dateIn}'`}, ${
				user.department > 0 ? user.department : 'NULL'
			})`,
		)
	}

	/**
	 * Actualizar usuario
	 * @description Edita un usuario existente
	 * @param req
	 * @param res
	 * @returns
	 */
	public async updateUser(req: express.Request, res: express.Response) {
		// PETICION
		const user = req.body.user as User
		const id: number = +req.params.id

		await runSQL(
			res,
			`UPDATE Users SET 
				user_role = '${user.role}',
				user_name = '${user.name}', 
				password = '${user.password}', 
				active = ${user.active ? 1 : 0},
				date_out = ${user.dateOut === null ? 'NULL' : `'${user.dateOut}'`}, 
				date_in = ${user.dateIn === null ? 'NULL' : `'${user.dateIn}'`}, 
				department_fk = ${user.department > 0 ? user.department : 'NULL'}
			WHERE user_id = ${id}`,
		)
	}

	/**
	 * Obtener usuarios
	 * @description Obtener toda la lista de usuarios
	 * @param _req
	 * @param res
	 * @returns
	 */
	public async getUsers(_req: express.Request, res: express.Response) {
		await runSQL(
			res,
			'SELECT * FROM Users LEFT JOIN Departments on Users.department_fk = Departments.department_id',
		)
	}
}

export default UserService
