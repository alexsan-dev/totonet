import express from 'express'
import fileUpload from 'express-fileupload'
import { JobApply, JobScore } from 'models/job'
import OracleDB from 'oracledb'
import { execute } from 'utils/db'
import runSQL from 'utils/sql'
import path from 'path'

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
				LEFT JOIN JobScores ON JobScores.job_fk = Jobs.job_id
        `,
		)
	}

	/**
	 * Crear aplicacion
	 * @description Crea una nueva apply a un puesto y asigna un reclutador disponible
	 * @param req
	 * @param res
	 */
	public async newApply(req: express.Request, res: express.Response) {
		// DATOS Y ARCHIVO
		const data = JSON.parse(req.body.data || '{}') as JobApply
		const file = req.files?.file as fileUpload.UploadedFile

		if (data && file) {
			let hasErr: boolean = false
			let filePath: string = ''

			// MOVER ARCHIVO
			try {
				filePath = `./storage/${file.name}`
				file.mv(filePath)
				filePath = path.resolve(filePath)
			} catch {
				hasErr = true
			}

			if (filePath.length) {
				// ERROR
				const onError = (err: Error) => {
					if (!hasErr) {
						hasErr = true
						res.status(200).json({
							success: false,
							msg: `Error al insertar los datos: ${err}`,
						})
					}
				}

				// OBTENER USUARIOS CON CVS
				const usersQuery = execute(
					'SELECT * FROM Users LEFT JOIN JobsApply ON JobsApply.user_fk = Users.user_id LEFT JOIN Departments ON Users.department_fk = Departments.department_id',
				).catch(onError)
				const query = (await usersQuery) as OracleDB.Result<unknown>

				// ORGANIZAR USUARIOS CON PUESTOS
				const rows = query?.rows as string[] | undefined
				const jobApply: { [id: number]: number } = {}

				if (rows?.length) {
					rows?.forEach((job) => {
						if (
							(job[0] as unknown as string) === 'recruiter' &&
							(job[3] as unknown as number) === 1 &&
							(job[19] as unknown as string) === data.department
						) {
							jobApply[job[4] as unknown as number] =
								(jobApply[job[4] as unknown as number] || 0) + 1
						}
					})

					// ORDENAR
					const sortedJobs = Object.entries(jobApply).sort(
						(entryA, entryB) => entryA[1] - entryB[1],
					)

					// INSERTAR APPLY DE PUESTO
					if (sortedJobs?.[0]?.[0])
						await execute(
							`INSERT INTO JobsApply VALUES (${+sortedJobs[0][0]}, ${
								data.id
							}, jobs_apply_seq.nextval, ${data.cui}, '${data.name}', '${
								data.lastName
							}', '${data.email}', '${data.address}', '${
								data.phone
							}', '${filePath}'), '${data.date}'`,
						).catch(onError)
					else {
						hasErr = true
						res.status(200).json({
							success: false,
							msg: `Error al insertar`,
						})
					}
				} else {
					if (!hasErr) {
						// CREAR UNO NUEVO
						const usersQuery = execute(
							'SELECT * FROM Users LEFT JOIN Departments ON Users.department_fk = Departments.department_id',
						).catch(onError)

						const usersResult = (await usersQuery) as OracleDB.Result<unknown>

						// BUSCAR RECLUTADOR
						let lastUser: number = -1
						usersResult?.rows?.forEach((row) => {
							if (
								(row as string[])[0] === 'recruiter' &&
								(row as string[])[9] === data.department &&
								(row as number[])[3] === 1
							)
								lastUser = (row as number[])[4]
						})

						// INSERTAR EN USER JOBS
						if (!hasErr) {
							if (lastUser !== -1) {
								// INSERTAR APPLY DE PUESTO
								await execute(
									`INSERT INTO JobsApply VALUES (${lastUser}, ${data.id}, jobs_apply_seq.nextval, ${data.cui}, '${data.name}', '${data.lastName}', '${data.email}', '${data.address}', '${data.phone}', '${filePath}', '${data.date}')`,
								).catch(onError)
							} else {
								hasErr = true
								res.status(200).json({
									success: false,
									msg: `Sin reclutadores disponibles`,
								})
							}
						}
					}
				}
			} else {
				hasErr = true
				res
					.status(200)
					.json({ success: false, msg: 'Error archivo no encontrado' })
			}

			if (!hasErr) res.status(200).json({ success: true })
		} else res.status(200).json({ success: false, msg: `Body invalido.` })
	}

	/**
	 * Puntuar puesto
	 * @description Puntuar puesto con numeros del 1 al 5
	 * @param req
	 * @param res
	 * @returns
	 */
	public async setScore(req: express.Request, res: express.Response) {
		const score = req.body as JobScore | undefined

		if (score)
			return await runSQL(
				res,
				`INSERT INTO JobScores VALUES (jobs_score_seq.nextval, ${score?.id}, ${score?.score})`,
			)
		else return res.status(200).json({ success: false, msg: 'Body invalido' })
	}
}

export default JobService
