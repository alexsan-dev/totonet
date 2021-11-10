import express from 'express'
import path from 'path/posix'

class StorageService {
	/**
	 * Storage
	 * @description Enviar archivo
	 * @param req
	 * @param res
	 */
	public async getFile(req: express.Request, res: express.Response) {
		const id = req.params.id

		if (id && id?.length) {
			res.sendFile(id, { root: path.resolve('./storage') })
		} else res.send('Archivo no encontrado')
	}
}

export default StorageService
