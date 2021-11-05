import React from 'react'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import Typography from '@mui/material/Typography'

const showWaitAlert = (text?: string): void => {
	// ALERTA DE ESPERA
	window.Alert({
		title: '',
		body: '',
		fixed: true,
		type: 'window',
		customElements: (
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CircularProgress />
				<Typography variant='body1' style={{ marginLeft: 'var(--margin)' }}>
					{text ?? 'Actualizando, espera un momento...'}
				</Typography>
			</div>
		),
	})
}

export default showWaitAlert
