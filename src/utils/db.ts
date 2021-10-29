// IMPORTS
import oracledb from 'oracledb'
import fs from 'fs'

// CREDENTIALS
const config = {
	user: 'SYSTEM',
	password: 'oracle',
	connectString: '172.17.0.2:49161',
}

// CONNECTION
let db: oracledb.Connection | undefined = undefined
export const startDb = async () => {
	try {
		oracledb.initOracleClient({ libDir: '/Library/instantclient_19_8' })
		db = await oracledb.getConnection(config)
	} catch (err) {
		console.log(err)
	}
}

// EJECUTAR
export async function execute<T>(
	sql: string,
): Promise<oracledb.Result<T> | undefined> {
	const connection = await db
	return connection?.execute(sql)
}

// EJECUTAR SCRIPT
export async function executeScript<T>(
	path: string,
): Promise<void | oracledb.Result<T>> {
	return new Promise((resolve, reject) => {
		fs.readFile(`src/scripts/${path}.sql`, async (err, data) => {
			if (err) {
				reject(`Error al leer el script ${path}.`)
			} else {
				const result = db
					?.execute(data.toString())
					.catch(reject) as void | oracledb.Result<T>
				resolve(result)
			}
		})
	})
}

export default db
