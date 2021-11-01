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
		// EMPEZAR
		await executeScript('clear').catch((err) =>
			res.status(500).json({
				success: false,
				msg: `Error al ejecutar el script main: ${err}.`,
			}),
		)

		// CREAR
		await executeScript('main').catch((err) =>
			res.status(500).json({
				success: false,
				msg: `Error al ejecutar el script main: ${err}.`,
			}),
		)

		res.status(200).json({ success: true })
	}
}

export default ModelService
