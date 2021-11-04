// IMPORTS
import oracledb from 'oracledb'
import fs from 'fs'

// CREDENTIALS
const config: oracledb.ConnectionAttributes = {
	user: 'SYSTEM',
	password: 'oracle',
	connectString: 'localhost:49161/xe',
}

let pool: oracledb.Pool | null = null

/**
 * Iniciar cliente oracle
 */
export const startDb = async () => {
	try {
		oracledb.initOracleClient({ libDir: '/Library/instantclient_19_8' })
		pool = await oracledb.createPool(config)
	} catch (err) {
		console.log(err)
	}
}

export const getConnection = () => {
	return pool?.getConnection()
}

/**
 * Ejecutar SQL
 * @description Ejecutar texto sql
 * @param sql
 * @returns
 */
export async function execute<T>(
	sql: string,
): Promise<oracledb.Result<T> | void> {
	const db = await getConnection()
	return db
		?.execute(sql, [], { autoCommit: true })
		.finally(async () => await db.close()) as oracledb.Result<T> | void
}

/**
 * Ejecutar script
 * @description Ejecuta un archivo .sql con el nombre path de la carpeta scripts
 * @param path
 * @returns
 */
export async function executeScript<T>(
	path: string,
): Promise<(void | oracledb.Result<T>)[]> {
	return new Promise((resolve, reject) => {
		fs.readFile(`src/scripts/${path}.sql`, async (err, data) => {
			if (err) {
				reject(`Error al leer el script ${path}: ${err}`)
			} else {
				const db = await getConnection()
				const queries = data
					.toString()
					.split(';')
					.map(async (query) => {
						const parsed = query.replace(/[^a-zA-Z\(\) ,_\d\']/g, '')
						if (parsed.length) {
							const result = await execute(parsed).catch(reject)
							return result
						}
					}) as (void | oracledb.Result<T>)[]

				const results = await Promise.all(queries)
				await db?.commit()
				await db?.close()
				resolve(results)
			}
		})
	})
}

export default startDb
