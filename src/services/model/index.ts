// IMPORTS
import { executeScript } from 'utils/db'
import express from 'express'
import sendError, { sendData } from 'utils/res'

class ModelService {
	/**
	 * Crear modelo
	 * @description Borrar y crear tablas de modelo principal
	 * @param _req
	 * @param res
	 */
	public async setModel(_req: express.Request, res: express.Response) {
		let hasErr: boolean = false

		// EMPEZAR
		await executeScript('clear').catch((err) => {
			hasErr = true
			sendError(res, err)
		})

		// CREAR
		if (!hasErr)
			await executeScript('main').catch((err) => {
				hasErr = true
				sendError(res, err)
			})

		if (!hasErr) sendData(res, {})
		return
	}
}

export default ModelService
