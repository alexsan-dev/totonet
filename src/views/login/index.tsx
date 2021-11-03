/* eslint-disable no-console */
import React, { useState } from 'react'

// ASSETS
import Logo from 'assets/logo.png'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

// ICONS
import VisibilityOffTwoTone from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'
import PersonTwoTone from '@mui/icons-material/PersonTwoTone'
import LockTwoTone from '@mui/icons-material/LockTwoTone'
import SendTwoTone from '@mui/icons-material/SendTwoTone'
import InfoTwoTone from '@mui/icons-material/InfoTwoTone'

// HOOKS
import { useHistory } from 'react-router-dom'

// ESTILOS
import Styles from './style.module.scss'

// TOOLS
import onSubmit, { LoginData } from './events'

const Login: React.FC = () => {
	// MOSTRAR OCULTAR CONTRA
	const [visiblePass, setVisiblePass] = useState(false)

	// QUITAR BARRA DE CARGA
	const [loader, setLoader] = useState(false)

	// ERRORES
	const [errs, setErrs] = useState<LoginData>({ name: false, password: false })

	// ROUTER
	const history = useHistory()

	// CAMBIAR TIPO DE INPUT
	const changeVisible = () => setVisiblePass(!visiblePass)

	// GUARDAR DATOS
	const onSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) =>
		onSubmit(ev, setErrs, setLoader, history)

	return (
		<main>
			<section className={Styles.container}>
				<div className={Styles.info}>
					<img src={Logo} alt='Logo' />
					<Typography variant='body1'>
						Gracias por visitarnos, bienvenido al dashboard oficial de Totonet. ✌️
					</Typography>
					<Button
						startIcon={<InfoTwoTone color='primary' />}
						sx={{
							fontWeight: 'bold',
							padding: '10px 20px',
							backgroundColor: '#fff !important',
							color: 'var(--primary)',
						}}>
						Ver mas
					</Button>
				</div>
				<div>
					<LinearProgress style={{ opacity: loader ? 1 : 0 }} />
					<form
						className={Styles.form}
						onSubmit={onSubmitHandler}
						style={{
							filter: loader ? 'grayscale(1)' : 'none',
							pointerEvents: loader ? 'none' : 'all',
						}}>
						<Typography className={Styles.title} variant='h5'>
							Iniciar sesión 👋
						</Typography>
						<div className={Styles.inputs}>
							<TextField
								fullWidth
								required
								name='name'
								autoComplete='username'
								defaultValue=''
								label='Nombre de usuario'
								placeholder='admin'
								error={(errs.name as boolean) ?? false}
								helperText={errs.name ? 'Nombre invalido' : '¿No recuerdas tu nombre?'}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<PersonTwoTone color={errs.name ? 'error' : 'primary'} />
										</InputAdornment>
									),
								}}
							/>
							<TextField
								required
								fullWidth
								autoComplete='current-password'
								defaultValue=''
								name='password'
								label='Contraseña'
								placeholder='SecurePASS'
								type={visiblePass ? 'text' : 'password'}
								error={(errs.password as boolean) ?? false}
								helperText={errs.password ? 'Contraseña invalida' : '¿No recuerdas tu contraseña?'}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LockTwoTone color={errs.password ? 'error' : 'primary'} />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={changeVisible}>
												{!visiblePass ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</div>
						<FormGroup className={Styles.remember}>
							<FormControlLabel control={<Checkbox defaultChecked />} label='Recordarme' />
						</FormGroup>
						<Button
							variant='contained'
							className={Styles.button}
							type='submit'
							startIcon={<SendTwoTone />}>
							Iniciar sesión
						</Button>
					</form>
				</div>
			</section>
		</main>
	)
}

export default Login
