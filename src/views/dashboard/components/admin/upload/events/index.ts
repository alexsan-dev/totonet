/* eslint-disable no-console */
import React from 'react'

/**
 * File drop
 * @description Leer archivo xml como texto
 * @param setXml
 * @param filesChanged
 */
const onDrop = (
	setXml: React.Dispatch<React.SetStateAction<{ xml: string; name: string }>>,
	filesChanged: File[]
): void => {
	const file = filesChanged[0]
	const reader = new FileReader()

	// EVENTOS
	reader.onabort = () => window.Snack('Carga cancelada')
	reader.onerror = () => window.Snack('Error al cargar archivo')
	reader.onload = () => setXml({ xml: reader.result as string, name: file?.name || '' })

	// CARGAR
	if (file?.type.includes('xml')) {
		reader.readAsText(file)
	}
}

export default onDrop
