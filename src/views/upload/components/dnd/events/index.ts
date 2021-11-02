/* eslint-disable no-console */
import authFetch from 'utils/tools'

/**
 * Enviar xml
 * @description Cargar xml a base de datos
 * @param xml
 */
const onSubmit = (xml: string) => {
	// PETICION
	authFetch('http://localhost:5000/upload', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ xml }),
	})
		.then(() => {
			window.Snack('Archivo xml subido correctamente')
		})
		.catch((err) => {
			window.Snack(err)
		})
}

export default onSubmit
