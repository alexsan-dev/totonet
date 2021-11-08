import express from 'express'
import OracleDB from 'oracledb'
import { execute } from './db'
import sendError, { sendData } from './res'

/**
 * Correr script
 * @description Ejecuta un script y retorna sus resultados
 * @param res
 * @param sql
 * @returns
 */
const runSQL = async (res: express.Response, sql: string) => {
	let hasErr: boolean = false

	// QUERY
	const query = await execute(sql).catch((err) => {
		console.log(err)
		hasErr = true
	})

	// RETORNAR USUARIO
	const data = query as OracleDB.Result<unknown>
	if (!hasErr) {
		if (data?.rows?.length) {
			return sendData(res, {
				data: data.rows,
				metaData: data.metaData,
			})
		} else
			return sendData(res, {
				data: [],
				metaData: [],
			})
	} else return sendError(res)
}

export default runSQL
