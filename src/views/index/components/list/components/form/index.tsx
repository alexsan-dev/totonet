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
import { styled } from '@mui/material/styles'
import Styles from './style.module.scss'

const Input = styled('input')({
	display: 'none',
})

const showApplyForm = (currentJob?: Job): void => {
	window.Alert({
		title: `Aplicar como ${currentJob?.name}`,
		body: 'Llena el siguiente formulario y espera hasta que un revisor te contacte. 👌',
		type: 'confirm',
		hideActions: true,
		customElements: (
			<>
				<form className={Styles.form}>
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
							type='email'
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
					<label htmlFor='contained-button-file'>
						<Input required accept='pdf/*' id='contained-button-file' multiple type='file' />
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
