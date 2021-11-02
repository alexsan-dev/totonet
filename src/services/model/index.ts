// IMPORTS
import { executeScript } from 'utils/db'
import express from 'express'

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
			res.status(500).json({
				success: false,
				msg: `Error al ejecutar el script main: ${err}.`,
			})
		})

		// CREAR
		await executeScript('main').catch((err) => {
			hasErr = true
			res.status(500).json({
				success: false,
				msg: `Error al ejecutar el script main: ${err}.`,
			})
		})

		if (!hasErr) res.status(200).json({ success: true })
		return
	}
}

export default ModelService
