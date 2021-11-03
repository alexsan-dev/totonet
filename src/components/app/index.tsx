import React from 'react'
import Router from 'router'
import GlobalSnack from 'components/snack'
import MuiThemeProvider from 'providers/theme'
import AlertProvider from 'providers/alerts'

const App: React.FC = () => (
	<MuiThemeProvider>
		<AlertProvider />
		<GlobalSnack />
		<Router />
	</MuiThemeProvider>
)

export default App
