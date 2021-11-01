// IMPORTS
import getTemporalTables, { setRelationTables, setTables } from './utils'
import { Data, TemporalData } from 'models/data'
import express from 'express'
import xml2js from 'xml-js'
import fs from 'fs'
import { executeScript } from 'utils/db'

class DataService {
	// CONSTRUCTOR
	constructor(private dev: boolean = false, private reset: boolean = false) {
		this.upload = this.upload.bind(this)
	}

	/**
	 * Carga masiva
	 * @description Subir archivo xml desde peticion o desde pruebas en modo dev
	 * @param _req
	 * @param res
	 */
	public async upload(_req: express.Request, res: express.Response) {
		// LEER DESDE PRUEBA
		if (this.dev) {
			if (this.reset) {
				await executeScript('clear')
				await executeScript('main')
			}

			fs.readFile('test/data.xml', async (err, data) => {
				if (err) {
					res
						.status(404)
						.json({ success: false, msg: `Error al leer el archivo: ${err}` })
				} else {
					// ERROR
					const onError = (err: Error) => {
						res.status(500).json({
							success: false,
							msg: `Error al insertar los datos: ${err}`,
						})
					}

					// CONVERTIR A JSON
					const dataStr: string = xml2js.xml2json(data.toString())
					const resData: Data = JSON.parse(dataStr)

					// DATOS TEMPORALES
					const temp: TemporalData = getTemporalTables(resData)
					await setTables(temp).catch(onError)

					// INSERTAR EN MODELO PRINCIPAL
					await setRelationTables(resData).catch(onError)

					// SALIR
					res.status(200).json({ success: true })
				}
			})
		} else {
			res.status(200).json({ success: true })
		}
	}
}

export default DataService
