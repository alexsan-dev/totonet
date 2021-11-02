import React, { useState } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import SettingsApplicationsTwoToneIcon from '@mui/icons-material/SettingsApplicationsTwoTone'
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import EventBusyTwoToneIcon from '@mui/icons-material/EventBusyTwoTone'
import PanToolTwoToneIcon from '@mui/icons-material/PanToolTwoTone'
import Grid3x3TwoToneIcon from '@mui/icons-material/Grid3x3TwoTone'
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone'
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone'

import Item from './components/item'
import useUsers from './hooks'

import Styles from './style.module.scss'

const UsersList: React.FC = () => {
	// LISTA
	const [users, setUsers] = useState<User[]>([])

	// HOOKS
	useUsers(setUsers)

	return (
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
							Inicio
						</TableCell>
						<TableCell align='left'>
							<EventBusyTwoToneIcon color='primary' />
							Baja
						</TableCell>
						<TableCell align='center'>
							<SettingsApplicationsTwoToneIcon color='primary' />
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<Item key={user.id} user={user} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default UsersList
