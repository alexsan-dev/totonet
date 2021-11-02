/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

// COMPONENTES
import { DropzoneProps } from 'react-dropzone'
import UploadInput from './components/dnd'
import XmlViewer from './components/xml'

// ESTILOS
import Styles from './style.module.scss'

// EVENTOS
import onDrop from './events'

const UploadView: React.FC = () => {
	// XML CARGADO
	const [xml, setXml] = useState({ xml: '', name: 'file.xml' })

	// ON DROP
	const onDropHandler: DropzoneProps['onDrop'] = (files) => onDrop(setXml, files)

	return (
		<div className={Styles.container}>
			<UploadInput xml={xml.xml} onDrop={onDropHandler} accept='.xml' />
			<XmlViewer {...xml} />
		</div>
	)
}

export default UploadView
