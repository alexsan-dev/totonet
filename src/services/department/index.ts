import express from 'express'
import runSQL from 'utils/sql'

class DepartmentService {
	/**
	 * Obtener departamentos
	 * @description Obtener toda la lista de departamentos
	 * @param _req
	 * @param res
	 * @returns
	 */
	public async getDepartments(_req: express.Request, res: express.Response) {
		return await runSQL(res, 'SELECT * FROM Departments')
	}
}

export default DepartmentService
