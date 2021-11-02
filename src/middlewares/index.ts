import { UserData } from 'models/auth'
import express from 'express'
import jwt from 'jsonwebtoken'

/**
 * Auth
 * @description Middleware de auth
 * @param req
 * @param res
 * @param next
 * @returns
 */
const withAuth = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	// OBTENER TOKEN
	const token = req.headers['authorization']

	// ROLE
	const { role } = req.body.user

	// ERROR SIN TOKEN
	if (token === null)
		return res.status(401).json({ success: false, msg: 'Token invalido' })
	// VERIFICAR
	else {
		jwt.verify(
			token || '',
			process.env.TOKEN_SECRET as string,
			(err: unknown, user: unknown) => {
				if (err) return res.status(403).json({ success: false, msg: err })
				else {
					if (!role || role === (user as UserData).role) {
						req.body.user = user
						next()
					} else
						return res.status(403).json({
							success: false,
							msg: `El usuario debe ser ${role} para acceder a esta ruta.`,
						})
				}
			},
		)
	}
}

export default withAuth
