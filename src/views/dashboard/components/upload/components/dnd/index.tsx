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
			<Dropzone {...props}>
				{({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => {
					const loaded = acceptedFiles.length > 0 && props.xml?.length
					return (
						<section>
							<div
								{...getRootProps()}
								className={`${Styles.container} ${isDragActive ? Styles.anim : ''}`}>
								<input {...getInputProps()} />
								{loaded ? (
									<CheckCircleTwoToneIcon color='primary' />
								) : (
									<UploadFileTwoToneIcon color='primary' />
								)}
								<Typography variant='h6'>
									{loaded
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
								disabled={!loaded}>
								Enviar datos
							</Button>
						</section>
					)
				}}
			</Dropzone>
		</section>
	)
}

export default UploadInput
