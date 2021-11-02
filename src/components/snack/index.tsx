// eslint-disable react-hooks/exhaustive-deps
// REACT
import React, { useState, useEffect } from 'react'

// MATERIAL
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Slide from '@mui/material/Slide'

// PROPS
interface SnackProps {
	body: string
	open: boolean
}
const GlobalSnack: React.FC = () => {
	// ESTADO
	const [snackState, setSnackState] = useState<SnackProps>({
		open: false,
		body: '',
	})

	// CERRAR
	const handleClose = (_event: unknown, reason: SnackbarCloseReason) => {
		if (reason === 'clickaway') return
		setSnackState({ open: false, body: '' })
	}

	// GLOBAL
	useEffect(() => {
		window.Snack = (msg: string) => setSnackState({ body: msg, open: true })
	})

	return (
		<Snackbar
			key='global_snack'
			onClose={handleClose}
			open={snackState.open}
			autoHideDuration={2000}
			message={snackState.body}
			TransitionComponent={Slide}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
		/>
	)
}

export default GlobalSnack
