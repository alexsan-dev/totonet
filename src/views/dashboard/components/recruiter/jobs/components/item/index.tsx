/* eslint-disable react/no-array-index-key */
import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

interface ItemProps {
	job: JobApply
	openMenu: (ev: React.MouseEvent) => void
}

const Item: React.FC<ItemProps> = ({ job, openMenu }) => {
	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell align='left'>{job.name}</TableCell>
			<TableCell align='left'>{job.lastName}</TableCell>
			<TableCell
				align='left'
				sx={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>
				{job.email}
			</TableCell>
			<TableCell align='left'>{job.phone}</TableCell>
			<TableCell align='left'>{job.cui}</TableCell>
			<TableCell align='left'>{job.jobName}</TableCell>
			<TableCell align='left'>{job.date}</TableCell>
			<TableCell align='center'>
				<IconButton onClick={openMenu}>
					<MoreVertTwoToneIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

export default Item
