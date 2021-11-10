import fileUpload from 'express-fileupload'
import { JobApply } from 'models/job'
import sendError from 'utils/res'
import runSQL from 'utils/sql'
import express from 'express'

class ApplicantService {
	/**
	 * Obtener postulaciones
	 * @description Obtener expedientes de postulacion por aplicante
	 * @param req
	 * @param res
	 */
	public async getJobs(req: express.Request, res: express.Response) {
		const userId = req.params.id as unknown as number
		if (userId) {
			return runSQL(
				res,
				`SELECT * FROM JobApplyStates INNER JOIN JobsApply ON JobApplyStates.job_apply_fk = JobsApply.job_apply_id INNER JOIN Jobs ON JobsApply.job_fk = Jobs.job_id INNER JOIN DepartmentJobs ON DepartmentJobs.job_fk = Jobs.job_id INNER JOIN Departments ON DepartmentJobs.department_fk = Departments.department_id WHERE JobApplyStates.user_fk = ${+userId}`,
			)
		} else sendError(res)
	}

	/**
	 * Actualizar
	 * @description Actualizar aplicacion a puesto con datos nuevos
	 * @param req
	 * @param res
	 * @returns
	 */
	public async updateApply(req: express.Request, res: express.Response) {
		// DATOS Y ARCHIVO
		const data = JSON.parse(req.body.data ?? '{}') as JobApply
		const file = req.files?.file as fileUpload.UploadedFile

		if (data) {
			let hasErr: boolean = false
			let filePath: string = data.cv ?? ''

			if (file) {
				// MOVER ARCHIVO
				try {
					filePath = `./storage/${file.name}`
					file.mv(filePath)
					filePath = file.name
				} catch {
					hasErr = true
				}
			}

			// ERROR
			const onError = (err: Error) => {
				if (!hasErr) {
					hasErr = true
					sendError(res, err)
				}
			}

			// UPDATE
			return runSQL(
				res,
				`UPDATE JobsApply SET 
					cui = ${+data.cui},
					apply_name = '${data.name}',
					last_name = '${data.lastName}',
					email = '${data.email}',
					apply_address = '${data.address}',
					phone = '${data.phone}',
					cv = '${filePath}'
				 WHERE JobsApply.job_apply_id = ${data.applyId}`,
			).catch(onError)
		} else return sendError(res)
	}
}

export default ApplicantService
