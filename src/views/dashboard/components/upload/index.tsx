/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

// COMPONENTES
import { DropzoneProps } from 'react-dropzone'
import Info from 'components/info'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
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

	// REINICIAR
	const reset = () => setXml({ xml: '', name: 'file.xml' })

	return (
		<section className={Styles.container}>
			<Info
				title='Carga masiva'
				body='Carga datos masivos desde un archivo xml.'
				button='Limpiar datos'
				buttonProps={{ onClick: reset }}
				icon={<HighlightOffTwoToneIcon />}
			/>
			<div className={Styles.content}>
				<UploadInput xml={xml.xml} onDrop={onDropHandler} accept='.xml' />
				<XmlViewer {...xml} />
			</div>
		</section>
	)
}

export default UploadView
