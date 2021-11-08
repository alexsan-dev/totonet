// IMPORTS
import getTemporalTables, { setRelationTables, setTables } from './utils'
import { Data, TemporalData } from 'models/data'
import { executeScript } from 'utils/db'
import express from 'express'
import xml2js from 'xml-js'
import fs from 'fs'
import sendError, { sendData } from 'utils/res'

class DataService {
	// CONSTRUCTOR
	constructor(private dev: boolean = false, private reset: boolean = false) {
		this.upload = this.upload.bind(this)
	}

	/**
	 * Carga masiva
	 * @description Subir archivo xml desde peticion o desde pruebas en modo dev
	 * @param req
	 * @param res
	 */
	public async upload(req: express.Request, res: express.Response) {
		// ERROR
		let hasErr: boolean = false
		const onError = (err: Error) => {
			if (!hasErr) {
				hasErr = true
				sendError(res, err)
			}
		}

		// CARGAR DATOS
		const setData = async (data: string | Buffer) => {
			// CONVERTIR A JSON
			const dataStr: string = xml2js.xml2json(data.toString())
			const resData: Data = JSON.parse(dataStr)

			// DATOS TEMPORALES
			const temp: TemporalData = getTemporalTables(resData)
			await setTables(temp).catch(onError)

			// INSERTAR EN MODELO PRINCIPAL
			await setRelationTables(resData).catch(onError)

			// SALIR
			if (!hasErr) return sendData(res, {})
		}

		// LEER DESDE PRUEBA
		if (this.dev) {
			if (this.reset) {
				await executeScript('clear').catch(onError)
				await executeScript('main').catch(onError)
			}

			fs.readFile('test/data.xml', async (err, data) => {
				if (err) {
					return sendError(res, err)
				} else await setData(data).catch(onError)
			})
		} else {
			// DATOS
			const { xml } = req.body
			if (!xml.length) {
				return sendError(res)
			} else {
				await setData(xml).catch(onError)
			}
		}
	}
}

export default DataService
