// IMPORTS
import { UserData } from 'models/auth'
import { execute } from 'utils/db'
import OracleDB from 'oracledb'
import jwt from 'jsonwebtoken'
import express from 'express'

class AuthService {
	constructor() {
		this.getUser = this.getUser.bind(this)
		this.signing = this.signing.bind(this)
		this.login = this.login.bind(this)
	}

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
		const user = req.body.user as UserData | undefined
		let hasErr: boolean = false
		if (user) {
			// VALIDAR USUARIO
			const query = (await execute(
				isNew
					? `INSERT INTRO Users (user_id, user_role, user_name, department_fk, password, dateIn) VALUES (
					users_seq, ${user?.role}, ${user?.name}, (SELECT department_id FROM Departments WHERE department_name = '${user?.department}'), ${user?.password}, ${user?.dateIn}
					)`
					: `SELECT user_id, user_role, password, active FROM Users WHERE user_name = '${user?.name}'`,
			).catch((err) => {
				hasErr = true
				res.json({ success: false, msg: err })
			})) as OracleDB.Result<unknown>

			if (
				((query?.rows &&
					query?.rows.length &&
					// @ts-ignore
					query?.rows?.[0][2] === user.password &&
					// @ts-ignore
					query?.rows?.[0][3] === 1) ||
					isNew) &&
				!hasErr &&
				user
			) {
				return res.json({
					success: true,
					// @ts-ignore
					role: query.rows?.[0][1],
					token: jwt.sign(
						// @ts-ignore
						{ ...user, role: query.rows?.[0][1] },
						process.env.TOKEN_SECRET || '',
						{
							expiresIn: `${3 * (isNew ? 1 : 5)}m`,
						},
					),
				})
			} else {
				if (!hasErr)
					return res.status(200).json({ success: false, msg: 'No autorizado' })
			}
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
