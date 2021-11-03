import express from 'express'
import OracleDB from 'oracledb'
import { execute } from './db'

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
	const query = await execute(sql).catch(() => {
		hasErr = true
	})

	// RETORNAR USUARIO
	const data = query as OracleDB.Result<unknown>
	if (!hasErr) {
		if (data?.rows?.length) {
			return res.status(200).json({ success: true, data: data.rows })
		} else return res.status(200).json({ success: true, data: [] })
	} else
		return res.status(500).json({ success: false, msg: 'Error al correr sql.' })
}

export default runSQL
