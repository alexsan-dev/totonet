import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

interface ItemProps {
	user: User
	openMenu: (ev: React.MouseEvent) => void
}

const userRoleName = {
	admin: 'Administrador',
	coord: 'Coordinador',
	recruiter: 'Reclutador',
	guest: 'Invitado',
}

const Item: React.FC<ItemProps> = ({ user, openMenu }) => {
	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell component='th' scope='row'>
				{user.id}
			</TableCell>
			<TableCell align='left'>{user.name}</TableCell>
			<TableCell align='left'>{user.password}</TableCell>
			<TableCell align='left'>{userRoleName[user.role]}</TableCell>
			<TableCell align='left'>{user.departmentName ?? 'Sin departamento'}</TableCell>
			<TableCell align='left'>{user.active ? 'Activo' : 'Inactivo'}</TableCell>
			<TableCell align='left'>{user.dateIn ?? 'Inicio del sistema'}</TableCell>
			<TableCell align='left'>{user.dateOut ?? 'Sin fecha de baja'}</TableCell>
			<TableCell align='center'>
				<IconButton onClick={openMenu}>
					<MoreVertTwoToneIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

export default Item
