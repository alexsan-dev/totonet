/* eslint-disable react/no-array-index-key */
import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'
import showApplyForm from './components/form'

interface ItemProps {
	job: JobApply
	index: number
	update: () => void
}

const Item: React.FC<ItemProps> = ({ job, index, update }) => {
	// HISTORY
	const history = useHistory()

	// ABRIR FORMULARIO
	const openForm = () => {
		showApplyForm(history, update, job)
		update()
	}

	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell align='left'>{index}</TableCell>
			<TableCell align='left'>{job.jobName}</TableCell>
			<TableCell align='left'>{job.department}</TableCell>
			<TableCell align='left'>{job.date}</TableCell>
			<TableCell align='left'>{job.status}</TableCell>
			<TableCell align='left'>
				<Button sx={{ width: 170 }} onClick={openForm} variant='outlined'>
					Editar expediente
				</Button>
			</TableCell>
			<TableCell align='left'>
				<Button sx={{ width: 150 }} variant='outlined'>
					Abrir requisitos
				</Button>
			</TableCell>
		</TableRow>
	)
}

export default Item
