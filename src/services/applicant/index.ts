import express from 'express'
import sendError from 'utils/res'
import runSQL from 'utils/sql'

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
			console.log(userId)
			return runSQL(
				res,
				`SELECT * FROM JobApplyStates INNER JOIN JobsApply ON JobApplyStates.job_apply_fk = JobsApply.job_apply_id INNER JOIN Jobs ON JobsApply.job_fk = Jobs.job_id INNER JOIN DepartmentJobs ON DepartmentJobs.job_fk = Jobs.job_id INNER JOIN Departments ON DepartmentJobs.department_fk = Departments.department_id WHERE JobApplyStates.user_fk = ${+userId}`,
			)
		} else sendError(res)
	}
}

export default ApplicantService
