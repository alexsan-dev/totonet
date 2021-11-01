// IMPORTS
import { UserData } from 'models/auth'
import { execute } from 'utils/db'
import OracleDB from 'oracledb'
import jwt from 'jsonwebtoken'
import express from 'express'

class AuthService {
	/**
	 * Obtener usuario
	 * @description Validar usuario
	 * @param req
	 * @param res
	 * @param isNew
	 * @returns
	 */
	private async getUser(
		req: express.Request,
		res: express.Response,
		isNew: boolean = false,
	) {
		// DATA
		const user = req.body.user as UserData

		// VALIDAR USUARIO
		const query = (await execute(
			isNew
				? `INSERT INTRO Users (user_id, user_role, user_name, department_fk, password, dateIn) VALUES (
					0, ${user.role}, ${
						user.name
				  }, (SELECT department_id FROM Departments WHERE department_name = '${
						user.department
				  }'), ${user.password}, ${user.dateIn.toLocaleString('en-GB')}
				)`
				: `SELECT user_id FROM Users WHERE user_name = '${user.name}'`,
		).catch((err) =>
			res.json({ success: false, msg: err }),
		)) as OracleDB.Result<unknown>

		if ((query.rows && query.rows.length) || isNew) {
			return res.json({
				success: true,
				token: jwt.sign(user, process.env.TOKEN_SECRET || '', {
					expiresIn: `${3 * (isNew ? 1 : 5)}m`,
				}),
			})
		}
	}

	/**
	 * Iniciar sesión
	 * @description Iniciar sesión y refrescar token
	 * @param req
	 * @param res
	 */
	public async login(req: express.Request, res: express.Response) {
		return await this.getUser(req, res)
	}

	/**
	 * Crear sesión
	 * @description Crear sesión y refrescar token
	 * @param req
	 * @param res
	 */
	public async signing(req: express.Request, res: express.Response) {
		return await this.getUser(req, res, true)
	}
}

export default AuthService
