import { Data, DepartmentsData, PrimaryData, TemporalData } from 'models/data'
import { execute } from 'utils/db'
import OracleDB from 'oracledb'

/**
 * Tablas temporales
 * @description Crear un json de datos para tablas individuales
 * @param resData
 */
const getTemporalTables = (resData: Data): TemporalData => {
	// DATOS TEMPORALES
	const temp: TemporalData = {
		Departments: {},
		Jobs: {},
		Categories: {},
		Requirements: {},
		Formats: {},
	}

	const setDepartments = (departments: DepartmentsData, depFk?: string) => {
		// RECORRER
		departments.elements?.forEach((departamento) => {
			// BUSCAR NOMBRE
			const dep_name = (
				departamento.elements?.find((depProps) => depProps.name === 'nombre')
					?.elements[0] as PrimaryData
			).text.trim() as string | undefined

			departamento.elements?.forEach((depProps) => {
				if (departamento.name === 'departamento') {
					if (dep_name?.length) {
						if (!(dep_name in temp.Departments)) {
							temp.Departments[dep_name] = {
								dep_name,
								total: 0,
								dep_fk: depFk,
							}
						}

						if (depProps.name === 'capital_total')
							// GUARDAR CAPITAL
							temp.Departments[dep_name].total = parseFloat(
								depProps.elements[0].text.trim(),
							)
						// RECORRER PUESTOS
						else if (depProps.name === 'puestos') {
							depProps.elements?.forEach((job) => {
								// NOMBRE
								const job_name = (
									job.elements?.find((jobProps) => jobProps.name === 'nombre')
										?.elements[0] as PrimaryData
								).text.trim() as string | undefined

								if (job.name === 'puesto') {
									job.elements?.forEach((jobProps) => {
										if (job_name) {
											if (!(job_name in temp.Jobs)) {
												// GUARDAR PUESTO
												temp.Jobs[job_name] = {
													job_name,
													salary: 0,
													image: '',
												}
											}

											if (jobProps.name === 'salario') {
												temp.Jobs[job_name].salary = parseFloat(
													jobProps.elements[0].text.trim(),
												)
											}

											if (jobProps.name === 'imagen') {
												temp.Jobs[job_name].image =
													jobProps.elements[0].text.trim()
											}

											// RECORRER CATEGORIAS
											else if (jobProps.name === 'categorias') {
												jobProps.elements?.forEach((category) => {
													if (category.name === 'categoria') {
														category.elements?.forEach((categoryProps) => {
															// NOMBRE
															if (categoryProps.name === 'nombre') {
																// GUARDAR CATEGORIA
																const category_name =
																	categoryProps.elements[0].text.trim()
																temp.Categories[category_name] = {
																	category_name,
																}
															}
														})
													}
												})
											}

											// RECORRER REQUISITOS
											else if (jobProps.name === 'requisitos') {
												jobProps.elements?.forEach((requirement) => {
													// NOMBRE
													const req_name = (
														requirement.elements?.find(
															(reqProps) => reqProps.name === 'nombre',
														)?.elements[0] as PrimaryData
													).text.trim() as string | undefined

													if (requirement.name === 'requisito') {
														requirement.elements?.forEach((reqProps) => {
															if (req_name?.length) {
																if (!(req_name in temp.Requirements)) {
																	// GUARDAR REQUISITO
																	temp.Requirements[req_name] = {
																		req_name,
																		r_size: 0,
																		r_required: 0,
																	}
																}

																// GUARDAR SIZE
																else if (reqProps.name === 'tamaño') {
																	temp.Requirements[req_name].r_size = parseInt(
																		reqProps.elements[0].text.trim(),
																		10,
																	)
																}

																// GUARDAR OBLIGATORIO
																else if (reqProps.name === 'obligatorio') {
																	temp.Requirements[req_name].r_required =
																		reqProps.elements[0].text.trim() === '1'
																			? 1
																			: 0
																}

																// RECORRER FORMATOS
																else if (reqProps.name === 'formatos') {
																	reqProps.elements?.forEach((format) => {
																		// NOMBRE
																		if (format.name === 'formato') {
																			// GUARDAR FORMATO
																			const name =
																				format.elements[0].elements[0].text.trim()
																			temp.Formats[name] = { format_name: name }
																		}
																	})
																}
															}
														})
													}
												})
											}
										}
									})
								}
							})
						}

						// SUB DEPARTAMENTOS
						else if (depProps.name === 'departamentos') {
							setDepartments(depProps, dep_name)
						}
					}
				}
			})
		})
	}

	setDepartments(resData.elements[0])

	return temp
}

/**
 * Insertar tablas
 * @description Insertar tabla temporal en db
 * @param tables
 * @returns
 */
export async function setTables<T>(
	tables: TemporalData,
): Promise<(OracleDB.Result<T> | undefined)[]> {
	// SQL FINAL
	let sql: string[] = []
	let subDepartments: string[] = []

	// INSERTAR DATOS
	Object.entries(tables)?.forEach((table) =>
		Object.keys(table[1])?.forEach((key, index) =>
			sql.push(
				`INSERT INTO ${table[0]} (${table[0]
					.toLowerCase()
					.substring(0, table[0].length - 1)
					.replace('categorie', 'category')}_id, ${Object.keys(
					table[1][key],
				).join(', ')}) VALUES (${index + 1}, ${Object.values(table[1][key])
					.map((value, valIndex) => {
						if (Object.keys(table[1][key])[valIndex] === 'dep_fk')
							if (value) {
								const subSql = `(SELECT department_id FROM Departments WHERE dep_name = '${value}')`
								subDepartments.push(
									`UPDATE Departments SET dep_fk = ${subSql} WHERE department_id = ${
										index + 1
									}`,
								)
								return subSql
							} else return 'NULL'
						else return typeof value === 'string' ? `'${value}'` : value
					})
					.join(', ')})`,
			),
		),
	)

	// EJECUTAR SCRIPT
	await Promise.all(
		sql.map((query) => execute(query)) as (OracleDB.Result<T> | undefined)[],
	)

	// EJECUTAR SCRIPTS EXTRAS
	return Promise.all(
		subDepartments.map((query) => execute(query)) as (
			| OracleDB.Result<T>
			| undefined
		)[],
	)
}

/**
 * Crear tablas relacionales
 * @description Crear tablas con llaves foraneas para completar las relaciones
 * @param resData
 * @returns
 */
export async function setRelationTables<T>(
	resData: Data,
): Promise<(OracleDB.Result<T> | undefined)[]> {
	// SQL
	const sql: string[] = []

	// GLOBALES
	let categoryIndex = 0,
		reqIndex = 0,
		formatIndex = 0,
		jobIndex = 0

	const setDepartments = (departments: DepartmentsData) => {
		departments.elements?.forEach((departamento) => {
			if (departamento.name === 'departamento') {
				// BUSCAR NOMBRE
				const dep_name = (
					departamento.elements?.find((depProps) => depProps.name === 'nombre')
						?.elements[0] as PrimaryData
				).text.trim() as string | undefined

				departamento.elements?.forEach((depProps) => {
					// RECORRER PUESTOS
					if (depProps.name === 'puestos') {
						depProps.elements?.forEach((job) => {
							const job_name = (
								job.elements?.find((jobProps) => jobProps.name === 'nombre')
									?.elements[0] as PrimaryData
							).text.trim() as string | undefined

							if (job.name === 'puesto') {
								job.elements?.forEach((jobProps) => {
									if (jobProps.name === 'nombre') {
										// INSERTAR
										jobIndex++
										sql.push(
											`INSERT INTO DepartmentJobs (department_fk, job_fk, job_dep_id) VALUES (
											(SELECT department_id FROM Departments WHERE dep_name = '${dep_name}'),
											(SELECT job_id FROM Jobs WHERE job_name = '${job_name}'), ${jobIndex})`,
										)
									} else if (jobProps.name === 'categorias') {
										jobProps.elements?.forEach((category) => {
											if (category.name === 'categoria') {
												category.elements?.forEach((categoryProps) => {
													// NOMBRE
													if (categoryProps.name === 'nombre') {
														// GUARDAR CATEGORIA
														const category_name =
															categoryProps.elements[0].text.trim()

														// INSERTAR
														categoryIndex++
														sql.push(
															`INSERT INTO JobCategories (category_fk, job_fk, job_category_id) VALUES (
																(SELECT category_id FROM Categories WHERE category_name = '${category_name}'),
																(SELECT job_id FROM Jobs WHERE job_name = '${job_name}'),
																${categoryIndex + 1}
															)`,
														)
													}
												})
											}
										})
									} else if (jobProps.name === 'requisitos') {
										jobProps.elements.forEach((requirement) => {
											// NOMBRE
											const req_name = (
												requirement.elements?.find(
													(reqProps) => reqProps.name === 'nombre',
												)?.elements[0] as PrimaryData
											).text.trim() as string | undefined

											if (requirement.name === 'requisito') {
												requirement.elements.forEach((reqProps) => {
													// INSERTAR
													if (reqProps.name === 'nombre') {
														reqIndex++
														sql.push(
															`INSERT INTO JobRequirements (req_fk, job_fk, job_req_id) VALUES (
															(SELECT requirement_id FROM Requirements WHERE req_name = '${req_name}'),
															(SELECT job_id from Jobs WHERE job_name = '${job_name}'), ${reqIndex + 1})`,
														)
													}

													// RECORRER FORMATOS
													else if (reqProps.name === 'formatos') {
														reqProps.elements?.forEach((format) => {
															// NOMBRE
															if (format.name === 'formato') {
																// GUARDAR FORMATO
																const format_name =
																	format.elements[0].elements[0].text.trim()

																// INSERTAR
																formatIndex++
																sql.push(
																	`INSERT INTO ReqFormats (format_fk, req_fk, req_format_id) VALUES (
																		(SELECT format_id FROM Formats WHERE format_name = '${format_name}'),
																		(SELECT requirement_id FROM Requirements WHERE req_name = '${req_name}'), ${
																		formatIndex + 1
																	})`,
																)
															}
														})
													}
												})
											}
										})
									}
								})
							}
						})
					} else if (depProps.name === 'departamentos') {
						setDepartments(depProps)
					}
				})
			}
		})
	}

	// INICIAL
	setDepartments(resData.elements[0])

	// EJECUTAR SCRIPT
	return Promise.all(
		sql.map((query) => execute(query)) as (OracleDB.Result<T> | undefined)[],
	)
}

export default getTemporalTables
