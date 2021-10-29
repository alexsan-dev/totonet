// IMPORTS
import { executeScript } from 'utils/db'
import express from 'express'

class ModelService {
	// CREAR MODELO
	public async setModel(_req: express.Request, res: express.Response) {
		await executeScript('main')
		res.status(200).json({ success: true })
	}
}

export default ModelService
