// REACT
import React from 'react'

// THEME
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

const MuiThemeProvider: React.FC = ({ children }) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
)

// EXPORT
export default MuiThemeProvider
