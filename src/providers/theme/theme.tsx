import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		button: {
			textTransform: 'none'
		},
		fontFamily: 'Montserrat'
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				rounded: {
					borderRadius: '10px',
					backgroundColor: 'rgb(246,246,246)'
				}
			}
		},
		MuiSelect: {
			styleOverrides: {
				outlined: {
					borderRadius: '10px'
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: '10px'
				}
			}
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '10px',
					fontSize: '1rem',
					padding: '10px 0'
				}
			}
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					border: 'none',
					borderRadius: '100%',

					'& .MuiSvgIcon-root': {
						opacity: 1
					}
				}
			}
		},
		MuiSwitch: {
			styleOverrides: {
				root: {
					'& .MuiIconButton-root': {
						backgroundColor: 'transparent',
						border: 'none',
						opacity: 1
					}
				}
			}
		},
		MuiIconButton: {
			styleOverrides: {
				sizeSmall: {
					backgroundColor: 'transparent',
					border: 'none',
					borderRadius: '100%',
					height: 'auto',
					width: 'auto',

					'& .MuiSvgIcon-root': {
						opacity: 1
					}
				},
				root: {
					borderRadius: 10
				}
			}
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderRadius: 10
						}
					}
				}
			}
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
					zIndex: 10
				}
			}
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					minHeight: 'unset'
				},
				regular: {
					minHeight: 'unset'
				},
				gutters: {
					paddingLeft: 0,
					paddingRight: 0
				}
			}
		}
	},
	palette: {
		secondary: {
			main: '#e81168'
		},
		primary: {
			main: '#1876d2'
		}
	}
})

export default theme
