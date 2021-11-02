import { execute } from 'utils/db'
import OracleDB from 'oracledb'
import express from 'express'

class UserService {
	constructor() {
		this.getUser = this.getUser.bind(this)
	}

	/**
	 * Obtener usuario
	 * @description Obtener un usuario por nombre
	 * @param req
	 * @param res
	 * @returns
	 */
	public async getUser(req: express.Request, res: express.Response) {
		let hasErr: boolean = false

		// PETICION
		const name: string = req.params.name

		if (name?.length) {
			const query = await execute(
				`SELECT * FROM Users WHERE user_name = '${name}'`,
			).catch((msg) => {
				hasErr = true
				return res.status(500).json({ success: true, msg })
			})

			// RETORNAR USUARIO
			if (!hasErr && (query as OracleDB.Result<unknown>)?.rows?.length) {
				const data = query as OracleDB.Result<unknown>
				console.log(data.rows)
				return res.status(200).json({ success: true, data: data.rows })
			}
		} else
			return res
				.status(500)
				.json({ success: true, msg: 'Id de usuario invalido' })
	}

	/**
	 * Obtener usuarios
	 * @description Obtener toda la lista de usuarios
	 * @param _req
	 * @param res
	 * @returns
	 */
	public async getUsers(_req: express.Request, res: express.Response) {
		let hasErr: boolean = false

		// QUERY
		const query = await execute(
			`SELECT * FROM Users LEFT JOIN Departments on Users.department_fk = Departments.department_id`,
		).catch((msg) => {
			hasErr = true
			return res.status(500).json({ success: false, msg })
		})

		// RETORNAR USUARIO
		if (!hasErr && (query as OracleDB.Result<unknown>)?.rows?.length) {
			const data = query as OracleDB.Result<unknown>
			return res.status(200).json({ success: true, data: data.rows })
		} else
			return res
				.status(500)
				.json({ success: false, msg: 'Error al leer los usuarios' })
	}
}

export default UserService
