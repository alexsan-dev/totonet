/* eslint-disable no-console */
import React, { useState } from 'react'

// MATERIAL
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

// ICONS
import VisibilityOffTwoTone from '@mui/icons-material/VisibilityOffTwoTone'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'
import EmailTwoTone from '@mui/icons-material/EmailTwoTone'
import LockTwoTone from '@mui/icons-material/LockTwoTone'
import SendTwoTone from '@mui/icons-material/SendTwoTone'
import InfoTwoTone from '@mui/icons-material/InfoTwoTone'

// ESTILOS
import Logo from 'assets/logo.png'
import Styles from './style.module.scss'


// TOOLS
import onSubmit, { LoginData } from './events'

const Login: React.FC = () => {
	// MOSTRAR OCULTAR CONTRA
	const [visiblePass, setVisiblePass] = useState(false)

  // ERRORES
  const [errs, setErrs] = useState<LoginData>({email:false, password:false})

  // CAMBIAR TIPO DE INPUT
	const changeVisible = () => setVisiblePass(!visiblePass)

	// GUARDAR DATOS
	const onSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => onSubmit(ev, setErrs)

	return (
		<main>
			<section className={Styles.container}>
				<div className={Styles.info}>
          <img src={Logo} alt='Logo'/>
					<Typography variant="body1">
						Gracias por visitarnos, bienvenido al dashboard oficial de Totonet. ✌️
					</Typography>
          <Button startIcon={<InfoTwoTone color='primary'/>} sx={{ fontWeight: 'bold', padding:'10px 20px', backgroundColor:'#fff !important', color: 'var(--primary)'}}>Ver mas</Button>
				</div>
				<div>
					<form className={Styles.form} onSubmit={onSubmitHandler}>
					<Typography className={Styles.title} variant="h5">Iniciar sesión 👋</Typography>
						<div className={Styles.inputs}>
							<TextField
              fullWidth
								name="email"
								defaultValue=""
								label="Correo electrónico"
								placeholder="example@domain.com"
                error={(errs.email as boolean) ?? false}
                helperText={errs.email ? 'Correo invalido' : '¿No recuerdas tu correo?'}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<EmailTwoTone color={errs.email ? 'error' : 'primary'} />
										</InputAdornment>
									)
								}}
							/>
							<TextField
              fullWidth
								defaultValue=""
								name="password"
								label="Contraseña"
								placeholder="SecurePASS"
								type={visiblePass ? 'text' : 'password'}
                error={(errs.password as boolean) ?? false}
                helperText={errs.password ? 'Contraseña invalida' : '¿No recuerdas tu contraseña?'}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockTwoTone color={errs.password ? 'error' : 'primary'} />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={changeVisible}>
												{!visiblePass ? (
													<VisibilityTwoTone />
												) : (
													<VisibilityOffTwoTone />
												)}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</div>
						<FormGroup className={Styles.remember}>
							<FormControlLabel
								control={<Checkbox defaultChecked />}
								label="Recordarme"
							/>
						</FormGroup>
						<Button variant='contained' className={Styles.button} type="submit" startIcon={<SendTwoTone />}>
							Iniciar sesión
						</Button>
					</form>
				</div>
			</section>
		</main>
	)
}

export default Login
