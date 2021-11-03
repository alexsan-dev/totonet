// REACT
import React from 'react'

// COMPONENTS
import AlertTemplate from 'components/lualert'

// TEMA
import { useTheme } from '@mui/material/styles'

const AlertsProvider: React.FC = () => {
	// TEMA
	const theme = useTheme()

	return (
		<AlertTemplate
			blurred
			zIndex={100}
			cancelText='Cancelar'
			confirmText='Aceptar'
			confirmColor={theme.palette.primary.main}
		/>
	)
}

export default AlertsProvider
