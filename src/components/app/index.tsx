import MuiThemeProvider from 'providers/theme'
import React from 'react'
import Router from 'router'
import withAlerts from '@weareluastudio/lualert'
import GlobalSnack from 'components/snack'

const App: React.FC = () => (
	<MuiThemeProvider>
		<GlobalSnack />
		<Router />
	</MuiThemeProvider>
)

export default withAlerts({
	confirmColor: 'var(--primary)',
	confirmText: 'Aceptar',
	cancelText: 'Aceptar',
	zIndex: 1000,
	blurred: true,
})(App)
