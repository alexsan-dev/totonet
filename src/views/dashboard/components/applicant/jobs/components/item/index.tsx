/* eslint-disable react/no-array-index-key */
import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'

interface ItemProps {
	job: JobApply
}

const Item: React.FC<ItemProps> = ({ job }) => {
	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell align='left'>{job.jobName}</TableCell>
			<TableCell align='left'>{job.department}</TableCell>
			<TableCell align='left'>{job.date}</TableCell>
			<TableCell align='left'>{job.status}</TableCell>
			<TableCell align='left'>
				<Button>Editar expediente</Button>
			</TableCell>
			<TableCell align='left'>
				<Button>Abrir requisitos</Button>
			</TableCell>
		</TableRow>
	)
}

export default Item
