import React from 'react'
import Rating from '@mui/material/Rating'
import showWaitAlert from 'components/waitAlert'

const showScores = (
	setUpdate: React.Dispatch<React.SetStateAction<number>>,
	currentJob?: Job
): void => {
	// GUARDAR PUNTUACION
	let score = 0
	const onChange = (_ev: unknown, value: number | null) => {
		score = value ?? 0
	}

	// ENVIAR
	const onConfirm = () => {
		if (score > 0) {
			// ESPERAR
			showWaitAlert()

			// ENVIAR
			fetch('http://localhost:5000/jobs/score', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id: currentJob?.id ?? 0, score } as JobScore),
			})
				.then((res) => res?.json())
				.then((resData) => {
					if (resData?.success) {
						window.Snack('Puntuación enviada.')
						setUpdate((update) => update + 1)
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
		title: 'Puntuar puesto',
		body: 'Agregar una puntuación a este puesto con un numero de estrellas.',
		type: 'confirm',
		onConfirm,
		customElements: (
			<div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 10px 0' }}>
				<Rating
					style={{ transform: 'scale(1.2)' }}
					name='scores'
					onChange={onChange}
					size='large'
				/>
			</div>
		),
	})
}

export default showScores
