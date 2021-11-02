/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

// MATERIAL
import Typography from '@mui/material/Typography'

// COMPONENTES
import Dropzone, { DropzoneProps } from 'react-dropzone'
import Button from '@mui/material/Button'

// ICONOS
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import UploadFileTwoToneIcon from '@mui/icons-material/UploadFileTwoTone'
import SendTwoTone from '@mui/icons-material/SendTwoTone'

import onSubmit from './events'

// ESTILOS
import Styles from './style.module.scss'

// PROPS
interface UploadInputProps extends DropzoneProps {
	xml: string
}

const UploadInput: React.FC<UploadInputProps> = (props) => {
	// ENVIAR DATOS
	const onSubmitHandler = () => onSubmit(props.xml)

	return (
		<section className={Styles.content}>
			<Typography variant='h4'>Carga masiva</Typography>

			<Dropzone {...props}>
				{({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => (
					<section>
						<div
							{...getRootProps()}
							className={`${Styles.container} ${isDragActive ? Styles.anim : ''}`}>
							<input {...getInputProps()} />
							{acceptedFiles.length > 0 ? (
								<CheckCircleTwoToneIcon color='primary' />
							) : (
								<UploadFileTwoToneIcon color='primary' />
							)}
							<Typography variant='h6'>
								{acceptedFiles.length > 0
									? 'Archivo cargado, haz click en enviar datos o sube otro. 😉'
									: 'Suelta tu archivo XML aqui, o haz click para subirlo. 👍'}
							</Typography>
						</div>
						<Button
							fullWidth
							color='secondary'
							variant='contained'
							onClick={onSubmitHandler}
							startIcon={<SendTwoTone />}
							disabled={!(acceptedFiles.length > 0)}>
							Enviar datos
						</Button>
					</section>
				)}
			</Dropzone>
		</section>
	)
}

export default UploadInput
