// IMPORTS
import { UserData } from 'models/auth'
import jwt from 'jsonwebtoken'
import express from 'express'

class AuthService {
	/**
	 * Iniciar sesión
	 * @description Iniciar sesión y refrescar token
	 * @param req
	 * @param res
	 */
	public async login(req: express.Request, res: express.Response) {
		// DATA
		const user = req.body.user as UserData
		res.json({
			success: true,
			token: jwt.sign(user, process.env.TOKEN_SECRET || '', {
				expiresIn: '3m',
			}),
		})
	}
}

export default AuthService
