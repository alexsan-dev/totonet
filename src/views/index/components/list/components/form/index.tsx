/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import TextField from '@mui/material/TextField'
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone'
import InputAdornment from '@mui/material/InputAdornment'
import SendTwoTone from '@mui/icons-material/SendTwoTone'
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone'
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone'
import FilePresentTwoToneIcon from '@mui/icons-material/FilePresentTwoTone'
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone'
import Button from '@mui/material/Button'
import showWaitAlert from 'components/waitAlert'
import { styled } from '@mui/material/styles'
import Styles from './style.module.scss'

const Input = styled('input')({
	display: 'none',
})

const showApplyForm = (currentJob?: Job): void => {
	// ENVIAR
	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()

		// DATOS
		const formData = (ev.target as HTMLFormElement).elements as unknown as JobApply
		const file = (formData.cv as unknown as HTMLInputElement)?.files?.[0]
		const data: JobApply = {
			jobId: currentJob?.jobId ?? 0,
			department: currentJob?.department,
			userId: currentJob?.userId || 0,
			cui: +(formData.cui as unknown as HTMLInputElement)?.value,
			name: (formData.name as unknown as HTMLInputElement)?.value,
			lastName: (formData.lastName as unknown as HTMLInputElement)?.value,
			email: (formData.email as unknown as HTMLInputElement)?.value,
			address: (formData.address as unknown as HTMLInputElement)?.value,
			phone: (formData.phone as unknown as HTMLInputElement)?.value?.toString(),
			date: new Date().toLocaleString('en-GB'),
		}

		if (file) {
			// DATOS CON ARCHIVOS
			const customData = new FormData()
			customData.append('data', JSON.stringify(data))
			customData.append('file', file)

			showWaitAlert()

			// FETCH
			fetch('http://localhost:5000/jobs/apply', {
				method: 'POST',
				body: customData,
			})
				.then((res) => res?.json())
				.then((resData) => {
					if (resData?.success) {
						window.Snack('Aplicacion enviada.')
					} else window.Snack('Error al enviar.')
					window.hideAlert()
				})
				.catch((err) => {
					window.Snack(err.toString())
					window.hideAlert()
				})
		}
	}

	window.Alert({
		title: `Aplicar como ${currentJob?.name}`,
		body: 'Llena el siguiente formulario y espera hasta que un revisor te contacte. 👌',
		type: 'confirm',
		hideActions: true,
		resetOnHide: true,
		customElements: (
			<>
				<form className={Styles.form} onSubmit={onSubmit}>
					<div className={Styles.row}>
						<TextField
							required
							fullWidth
							name='cui'
							label='CUI'
							placeholder='3773328520115'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<RecentActorsTwoToneIcon />
									</InputAdornment>
								),
							}}
						/>

						<TextField
							required
							fullWidth
							name='name'
							label='Nombre'
							placeholder='Alex'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<PersonOutlineTwoToneIcon />
									</InputAdornment>
								),
							}}
						/>
					</div>
					<div className={Styles.row}>
						<TextField
							required
							fullWidth
							name='lastName'
							label='Apellido'
							placeholder='Santos'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<PersonAddAlt1TwoToneIcon />
									</InputAdornment>
								),
							}}
						/>

						<TextField
							required
							type='email'
							fullWidth
							name='email'
							label='Correo'
							placeholder='example@domain.com'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<EmailTwoToneIcon />
									</InputAdornment>
								),
							}}
						/>
					</div>
					<div className={Styles.row}>
						<TextField
							required
							fullWidth
							name='address'
							label='Dirección'
							placeholder='3ra calle A 15-24'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<HomeTwoToneIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							required
							type='tel'
							fullWidth
							name='phone'
							label='Teléfono'
							placeholder='12345678'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<LocalPhoneTwoToneIcon />
									</InputAdornment>
								),
							}}
						/>
					</div>
					<label htmlFor='cv'>
						<Input required accept='pdf/*' name='cv' id='cv' multiple type='file' />
						{/* 
            // @ts-ignore */}
						<Button
							variant='contained'
							fullWidth
							type='button'
							color='primary'
							component='span'
							startIcon={<FilePresentTwoToneIcon />}>
							Subir PDF de curriculum
						</Button>
					</label>

					<div className={Styles.actions}>
						<Button onClick={window.hideAlert}>Cancelar</Button>
						<Button type='submit' color='primary' variant='contained' startIcon={<SendTwoTone />}>
							Enviar
						</Button>
					</div>
				</form>
			</>
		),
	})
}

export default showApplyForm
