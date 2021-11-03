/* eslint-disable no-console */
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

// DATOS
export interface LoginData {
	name?: HTMLInputElement | boolean | string
	password?: HTMLInputElement | boolean | string
}

// eslint-disable-next-line no-unused-vars
const onSubmit = (
	ev: React.FormEvent<HTMLFormElement>,
	setErrs: React.Dispatch<React.SetStateAction<LoginData>>,
	setLoader: React.Dispatch<React.SetStateAction<boolean>>,
	history: RouteComponentProps['history']
): void => {
	ev.preventDefault()

	// CARGA
	setLoader(true)

	// DATOS
	const formData = (ev.target as HTMLFormElement).elements as unknown as LoginData
	const data = {
		name: (formData.name as HTMLInputElement)?.value,
		password: (formData.password as HTMLInputElement)?.value,
	}

	// MOSTRAR ERRORES
	const validData = { email: !data.name?.length, password: !data.password?.length }
	setErrs(validData)

	if (!validData.email && !validData.password) {
		fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: data }),
		})
			.then((req) => req.json())
			.then((credential) => {
				if (credential.success) {
					document.cookie = `role=${credential.role}; SameSite=strict; Path=/; Max-Age=${3 * 60}`
					document.cookie = `token=${credential.token}; SameSite=strict; Path=/; Max-Age=${3 * 60}`

					window.Snack(`Bienvenido ${data.name}`)
					history.push('/dashboard')
				} else {
					setLoader(false)
					window.Snack('Error al iniciar')
				}
			})
			.catch(() => {
				window.Snack('Error al iniciar')
				setLoader(false)
			})
	} else {
		setLoader(false)
	}
}

export default onSubmit
