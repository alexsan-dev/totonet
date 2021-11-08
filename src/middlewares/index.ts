import { UserData } from 'models/auth'
import { UserRole } from 'models/user'
import sendError from 'utils/res'
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
const withAuth =
	(reqRole?: UserRole) =>
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		// OBTENER TOKEN
		const token = req.headers['authorization']

		// ERROR SIN TOKEN
		if (token === null) return sendError(res)
		// VERIFICAR
		else {
			jwt.verify(
				token || '',
				process.env.TOKEN_SECRET as string,
				(err: unknown, user: unknown) => {
					if (err) return sendError(res, err as string)
					else {
						let role = (user as UserData).role
						if (!reqRole || role === reqRole) {
							next()
						} else return sendError(res)
					}
				},
			)
		}
	}

export default withAuth
