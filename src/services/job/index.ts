import express from 'express'
import runSQL from 'utils/sql'

class JobService {
	/**
	 * Obtener departamentos
	 * @description Obtener toda la lista de departamentos
	 * @param _req
	 * @param res
	 * @returns
	 */
	public async getJobs(_req: express.Request, res: express.Response) {
		return await runSQL(
			res,
			`SELECT * FROM DepartmentJobs 
        INNER JOIN Departments ON DepartmentJobs.department_fk = Departments.department_id 
        INNER JOIN Jobs ON DepartmentJobs.job_fk = Jobs.job_id 
        INNER JOIN JobCategories ON DepartmentJobs.job_fk = JobCategories.job_fk 
        INNER JOIN Categories on JobCategories.category_fk = Categories.category_id
        INNER JOIN JobRequirements ON DepartmentJobs.job_fk = JobRequirements.job_fk 
        INNER JOIN Requirements on JobRequirements.req_fk = Requirements.requirement_id
        INNER JOIN ReqFormats ON ReqFormats.req_fk = Requirements.requirement_id 
        INNER JOIN Formats on ReqFormats.format_fk = Formats.format_id
        `,
		)
	}
}

export default JobService
