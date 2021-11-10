/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import useScrollTrigger from '@mui/material/useScrollTrigger'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import Slide from '@mui/material/Slide'

import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone'

import Logo from 'assets/logo.png'
import useUserToken from 'hooks/auth'

import { useHistory, Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Styles from './style.module.scss'
import logout from './events'

interface Props {
	window?: () => Window
	children: React.ReactElement
}

const userRoleName = {
	admin: 'administrador',
	coord: 'coordinador',
	recruiter: 'reclutador',
	guest: 'invitado',
	apply: 'aplicante',
}

// LISTENER DE WINDOW PARA SCROLL
const HideOnScroll: React.FC<Props> = (props: Props) => {
	const { children, window } = props
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	})

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	)
}

interface TopBarProps {
	title?: string
	action?: JSX.Element
}

// TOPBAR
const Topbar: React.FC<TopBarProps> = ({ title, action }) => {
	// TOKEN
	const token = useUserToken()

	// HISTORY
	const history = useHistory()

	// CERRAR SESION
	const logoutHandler = () => logout(history)

	return (
		<>
			<HideOnScroll>
				<AppBar>
					<Toolbar className={Styles.content}>
						<Link to='/'>
							<img src={Logo} alt='Logo' />
						</Link>
						<Typography variant='h6' component='div'>
							{title ?? `Dashboard de ${userRoleName?.[token?.role ?? 'admin']}`}
						</Typography>
						<div />
						{action ?? (
							<Button
								onClick={logoutHandler}
								variant='outlined'
								color='inherit'
								startIcon={<PowerSettingsNewTwoToneIcon />}>
								Cerrar sesión
							</Button>
						)}
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Toolbar />
		</>
	)
}

HideOnScroll.defaultProps = {
	window: undefined,
}
Topbar.defaultProps = {
	title: undefined,
	action: undefined,
}

export default Topbar
