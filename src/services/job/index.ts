import { JobApply, JobScore } from 'models/job'
import sendError, { sendData } from 'utils/res'
import fileUpload from 'express-fileupload'
import AuthService from 'services/auth'
import { UserData } from 'models/auth'
import nodemailer from 'nodemailer'
import { execute } from 'utils/db'
import OracleDB from 'oracledb'
import runSQL from 'utils/sql'
import express from 'express'

class JobService {
	// GLOBALES
	private apiAccount: { user: string; pass: string }
	private transporter: nodemailer.Transporter

	// CONSTRUCTOR
	constructor() {
		this.acceptApply = this.acceptApply.bind(this)
		this.apiAccount = {
			user: 'parchivos201602489@gmail.com',
			pass: 'stmgkvescjfikbij',
		}
		this.transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: this.apiAccount,
		})
	}

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
	 * Nueva aplicacion
	 * @description Agregar aplicacion para trabajo
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
				filePath = file.name
			} catch {
				hasErr = true
			}

			if (filePath.length) {
				// ERROR
				const onError = (err: Error) => {
					if (!hasErr) {
						hasErr = true
						sendError(res, err)
					}
				}

				// OBTENER USUARIOS CON CVS
				const usersQuery = execute(
					'SELECT * FROM Users RIGHT JOIN JobsApply ON JobsApply.user_fk = Users.user_id LEFT JOIN Departments ON Users.department_fk = Departments.department_id',
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
							(job[20] as unknown as string) === data.department
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
								data.jobId
							}, jobs_apply_seq.nextval, ${data.cui}, '${data.name}', '${
								data.lastName
							}', '${data.email}', '${data.address}', '${
								data.phone
							}', '${filePath}', '${data.date}')`,
						).catch(onError)
					else {
						hasErr = true
						sendError(res)
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
									`INSERT INTO JobsApply VALUES (${lastUser}, ${data.jobId}, jobs_apply_seq.nextval, ${data.cui}, '${data.name}', '${data.lastName}', '${data.email}', '${data.address}', '${data.phone}', '${filePath}', '${data.date}')`,
								).catch(onError)
							} else {
								hasErr = true
								sendError(res)
							}
						}
					}
				}
			} else {
				hasErr = true
				sendError(res)
			}

			if (!hasErr) sendData(res, {})
		} else sendError(res)
	}

	/**
	 * Agregar puntuacion
	 * @description Agregar puntuacion de aplicacion
	 * @param req
	 * @param res
	 */
	public async setScore(req: express.Request, res: express.Response) {
		const score = req.body as JobScore
		if (score) {
			return runSQL(
				res,
				`INSERT INTO JobScores VALUES (jobs_score_seq.nextval, ${score.id}, ${score.score})`,
			)
		} else return sendError(res)
	}

	/**
	 * Obtener aplicaciones a puesto
	 * @description Retorna toda la lista de aplicaciones a los puestos
	 * @param req
	 * @param res
	 */
	public async getApps(req: express.Request, res: express.Response) {
		const user = req.body.user as UserData | undefined

		if (user) {
			if (user.uid) {
				return runSQL(
					res,
					`SELECT * FROM JobsApply INNER JOIN Jobs ON JobsApply.job_fk = Jobs.job_id WHERE JobsApply.user_fk = ${+user.uid}`,
				)
			} else return sendError(res)
		} else return sendError(res)
	}

	/**
	 * Aceptar aplicaciones
	 * @description Aceptar o rechazar aplicaciones de trabajo
	 * @param req
	 * @param res
	 * @returns
	 */
	public async acceptApply(req: express.Request, res: express.Response) {
		const job = req.body.job as JobApply
		const user = req.body.user as UserData | undefined
		const accept = req.body.accept as boolean

		if (job) {
			// ERROR
			let hasErr = false
			const onError = (err: Error) => {
				hasErr = true
				if (!hasErr) {
					sendError(res, err)
				}
			}

			// SELECCIONAR APPLY
			const query = execute(
				`SELECT * FROM JobsApply INNER JOIN JOBS ON JobsApply.job_fk = Jobs.job_id WHERE JobsApply.job_apply_id = ${job.applyId}`,
			)
			query.catch(onError)
			const result = (await query) as OracleDB.Result<string>

			// @ts-ignore
			const jobApply = result?.rows[0] as string[] | undefined
			const password = Math.round(Math.random() * 1000000).toString()

			// ENVIAR CORREO
			if (!hasErr) {
				if (jobApply)
					return this.transporter.sendMail(
						{
							from: this.apiAccount.user,
							to: jobApply[6],
							subject: 'Proyecto01',
							text: `${
								accept ? `\nusuario: ${jobApply[3]}\npass: ${password}` : ''
							}`,
						},
						async (err, msg) => {
							if (!hasErr) {
								if (err) {
									console.log(err)
									return sendError(res, err)
								} else {
									if (accept) {
										// CREAR USUARIO
										const userService = new AuthService()
										await userService
											.getUser(req, res, true, {
												name: jobApply[3],
												uid: user?.uid ?? 0,
												password,
												role: 'apply',
												dateIn: new Date().toLocaleString('en-Gb'),
											})
											.catch(onError)

										// ULTIMO USUARIO
										const userQuery = execute('SELECT COUNT(*) FROM Users')
										userQuery.catch(onError)
										const userResult =
											(await userQuery) as OracleDB.Result<string>

										// AGREGAR ESTADO
										if (userResult.rows) {
											const stateQuery = execute(
												`INSERT INTO JobApplyStates VALUES (jobs_apply_state_seq.nextval, ${userResult.rows[0]}, ${job.applyId}, 'Aceptada')`,
											)
											stateQuery.catch(onError)
											await stateQuery

											// OBTENER REQUERIMIENTOS
											const jobReqQuery = execute(
												`SELECT * FROM JobRequirements WHERE JobRequirements.job_fk = ${job.jobId}`,
											)
											jobReqQuery.catch(onError)
											const jobReqResult =
												(await jobReqQuery) as OracleDB.Result<string>

											if (jobReqResult.rows) {
												const applyReq = jobReqResult.rows.map(async (row) => {
													// AGREGAR REQUERIMIENTOS
													const reqQuery = execute(
														`INSERT INTO JobApplyReq VALUES (jobs_apply_req_state_seq.nextval, ${job.applyId}, ${row[0]}, NULL)`,
													)
													reqQuery.catch(onError)
													await reqQuery
												})

												await Promise.all(applyReq)
											}
										}
									}

									// SALIR
									else if (!hasErr) return sendData(res, { msg })
								}
							}
						},
					)
				else return sendError(res)
			}
		} else return sendError(res)
	}
}

export default JobService
