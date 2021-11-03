import React, { useState } from 'react'

import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// ICONS
import PersonTwoTone from '@mui/icons-material/PersonTwoTone'
import LockTwoTone from '@mui/icons-material/LockTwoTone'
import SaveTwoTone from '@mui/icons-material/SaveTwoTone'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

import useDepartments from './hooks'

import Styles from './style.module.scss'
import onSubmit from './events'

interface NewUserFormProps {
	user?: User
	onSuccess?: () => void
	preview?: boolean
}
const NewUserForm: React.FC<NewUserFormProps> = ({ user, onSuccess, preview }) => {
	// DEPARTAMENTOS
	const [departments, setDepartments] = useState<Department[]>([])

	// HOOKS
	useDepartments(setDepartments)

	// ENVIAR DATOS
	const submitHandler = (ev: React.FormEvent<HTMLFormElement>) =>
		onSubmit(ev, user === undefined || user === null, user, onSuccess)

	return (
		<>
			<Typography variant='h5'>
				{user ? `${preview ? 'Ver' : 'Editar'} al usuario ${user.name}` : 'Crear usuario'}
			</Typography>
			<Typography variant='body1'>
				{user
					? `${preview ? 'Observa' : 'Cambia'} todas las propiedades de ${user.name}.`
					: 'Configura un nuevo usuario dentro del sistema.'}
			</Typography>
			<form
				onSubmit={submitHandler}
				className={Styles.form}
				style={{
					marginBottom: preview ? '0px' : '0px',
					paddingBottom: preview ? '10px' : '20px',
					pointerEvents: preview ? 'none' : 'all',
				}}>
				<TextField
					fullWidth
					required
					name='name'
					autoComplete='username'
					defaultValue={user?.name ?? ''}
					label='Nombre de usuario'
					placeholder='admin'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<PersonTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
				<TextField
					fullWidth
					required
					autoComplete='current-password'
					defaultValue={user?.password ?? ''}
					name='password'
					label='Contraseña'
					placeholder='SecurePASS'
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<LockTwoTone color='primary' />
							</InputAdornment>
						),
					}}
				/>
				<FormControl required fullWidth>
					<InputLabel>Seleccionar rol</InputLabel>
					<Select name='role' required defaultValue={user?.role ?? ''} label='Seleccionar rol'>
						<MenuItem value='admin'>Administrador</MenuItem>
						<MenuItem value='coord'>Coordinador</MenuItem>
						<MenuItem value='recruiter'>Reclutador</MenuItem>
					</Select>
				</FormControl>
				<FormControl disabled={!departments?.length} fullWidth>
					<InputLabel>Seleccionar departamento</InputLabel>
					<Select
						name='department'
						defaultValue={user?.department?.toString() ?? ''}
						label='Seleccionar departamento'>
						{departments.map((dep) => (
							<MenuItem key={dep.id?.toString()} value={dep.id?.toString()}>
								{dep.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{!preview && (
					<div className={Styles.actions}>
						<Button fullWidth type='button' onClick={window.hideAlert}>
							Cancelar
						</Button>
						<Button type='submit' fullWidth variant='contained' startIcon={<SaveTwoTone />}>
							Guardar
						</Button>
					</div>
				)}
			</form>
		</>
	)
}

NewUserForm.defaultProps = {
	user: undefined,
	onSuccess: undefined,
	preview: false,
}

export default NewUserForm
