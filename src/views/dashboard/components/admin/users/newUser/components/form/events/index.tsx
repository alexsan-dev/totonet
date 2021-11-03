import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import authFetch from 'utils/tools'

const onSubmit = (
	ev: React.FormEvent<HTMLFormElement>,
	isNew: boolean,
	history: RouteComponentProps['history'],
	user?: User,
	onSuccess?: () => void
): void => {
	ev.preventDefault()

	// DATOS
	const formData = (ev.target as HTMLFormElement).elements as unknown as User
	const data: User = {
		name: (formData.name as unknown as HTMLInputElement)?.value,
		password: (formData.password as unknown as HTMLInputElement)?.value,
		role: (formData.role as unknown as HTMLInputElement)?.value as UserRole,
		department: +(formData.department as unknown as HTMLInputElement)?.value,
		active: user?.active ?? true,
		id: user?.id ?? 0,
		dateIn: user?.dateIn ?? new Date().toLocaleDateString('en-GB'),
		dateOut: user?.dateOut ?? null,
	}

	// ALERTA DE ESPERA
	window.Alert({
		title: '',
		body: '',
		fixed: true,
		type: 'window',
		customElements: (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CircularProgress />
				<p style={{ marginLeft: 'var(--margin)' }}>Actualizando, espera un momento...</p>
			</div>
		),
	})

	// GUARDAR O CREAR USUARIO
	authFetch(history, `http://localhost:5000/user${isNew ? '' : `/${user?.id}`}`, {
		method: isNew ? 'POST' : 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ user: data }),
	})
		.then((res) => res?.json())
		.then((op) => {
			if (op.success) {
				if (onSuccess) onSuccess()
				window.hideAlert()
			}
		})
		.catch((err) => window.Snack(err.toString()))
}

export default onSubmit
