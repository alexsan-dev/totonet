import React, { useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import SettingsApplicationsTwoToneIcon from '@mui/icons-material/SettingsApplicationsTwoTone'
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone'
import PanToolTwoToneIcon from '@mui/icons-material/PanToolTwoTone'
import Grid3x3TwoToneIcon from '@mui/icons-material/Grid3x3TwoTone'
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone'
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone'
import LockTwoTone from '@mui/icons-material/LockTwoTone'

import { useHistory } from 'react-router-dom'
import Item from './components/item'
import useUsers from './hooks'

import Styles from './style.module.scss'
import showUser from '../newUser'
import deleteUser from './events'

// PROPS
interface UsersListProps {
	extUpdateCounter: number
}

const UsersList: React.FC<UsersListProps> = ({ extUpdateCounter }) => {
	// HISTORY
	const history = useHistory()

	// LISTA
	const [users, setUsers] = useState<User[]>([])

	// ACTUALIZAR USUARIOS
	const [updateCounter, setUpdateCounter] = useState<number>(0)

	// MENU
	const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)
	const [currentUser, setCurrentUser] = useState<User | undefined>()

	// CERRAR MENU
	const handleClose = () => setMenuAnchor(null)

	// ABRIR MENU
	const openMenu = (user: User) => (ev: React.MouseEvent) => {
		setCurrentUser(user)
		setMenuAnchor(ev.currentTarget as HTMLButtonElement | null)
	}

	// ACTUALIZAR USUARIO
	const updateUser = () => {
		showUser(currentUser, () => setUpdateCounter(updateCounter + 1))
		handleClose()
	}

	// BORRAR USUARIO
	const deleteUserHandler = () => {
		deleteUser(history, currentUser, () => setUpdateCounter(updateCounter + 1))
		handleClose()
	}

	// VER USUARIO
	const showCurrentUser = () => {
		showUser(currentUser, undefined, true)
		handleClose()
	}

	// HOOKS
	useUsers(history, setUsers, updateCounter + extUpdateCounter)

	return (
		<>
			<TableContainer component={Paper} className={Styles.table}>
				<Table stickyHeader>
					<TableHead className={Styles.tHead}>
						<TableRow>
							<TableCell>
								<Grid3x3TwoToneIcon color='primary' />
								Id
							</TableCell>
							<TableCell align='left'>
								<PersonTwoToneIcon color='primary' />
								Nombre
							</TableCell>
							<TableCell align='left'>
								<LockTwoTone color='primary' />
								Contraseña
							</TableCell>
							<TableCell align='left'>
								<PanToolTwoToneIcon color='primary' />
								Rol
							</TableCell>
							<TableCell align='left'>
								<DomainTwoToneIcon color='primary' />
								Departamento
							</TableCell>
							<TableCell align='left'>
								<CheckCircleTwoToneIcon color='primary' />
								Activo
							</TableCell>
							<TableCell align='left'>
								<EventAvailableTwoToneIcon color='primary' />
								Fecha de Inicio
							</TableCell>
							<TableCell align='left'>
								<EventBusyTwoToneIcon color='primary' />
								Fecha de Baja
							</TableCell>
							<TableCell align='center'>
								<SettingsApplicationsTwoToneIcon color='primary' />
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users?.map((user) => (
							<Item key={user.id} user={user} openMenu={openMenu(user)} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Menu
				id='item-menu'
				open={Boolean(menuAnchor)}
				anchorEl={menuAnchor}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}>
				<MenuItem onClick={showCurrentUser}>Visualizar</MenuItem>
				<MenuItem onClick={updateUser}>Actualizar</MenuItem>
				<MenuItem onClick={deleteUserHandler}>Borrar</MenuItem>
			</Menu>
		</>
	)
}

export default UsersList
