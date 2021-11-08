import express from 'express'

/**
 * Enviar error
 * @description Enviar un error con un mensaje success false
 * @param res
 */
const sendError = (res: express.Response, err?: Error | string) => {
	res.status(200).json({ success: false, err })
}

/**
 * Enviar respuesta con exito
 * @description Enviar datos y un mensaje success true
 * @param res
 */
export const sendData = (res: express.Response, data: Object) => {
	res.status(200).json({ success: true, ...data })
}

export default sendError
