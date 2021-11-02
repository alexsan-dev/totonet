import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

interface ItemProps {
	user: User
}
const Item: React.FC<ItemProps> = ({ user }) => {
	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell component='th' scope='row'>
				{user.id}
			</TableCell>
			<TableCell align='left'>{user.name}</TableCell>
			<TableCell align='left'>{user.role}</TableCell>
			<TableCell align='left'>{user.department ?? 'Sin departamento'}</TableCell>
			<TableCell align='left'>{user.active ? 'Activo' : 'Inactivo'}</TableCell>
			<TableCell align='left'>{user.dateIn ?? '--'}</TableCell>
			<TableCell align='left'>{user.dateIn ?? '--'}</TableCell>
			<TableCell align='center'>
				<IconButton>
					<MoreVertTwoToneIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

export default Item
