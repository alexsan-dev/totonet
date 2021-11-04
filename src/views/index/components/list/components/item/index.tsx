/* eslint-disable react/no-array-index-key */
import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone'
import StarBorderTwoTone from '@mui/icons-material/StarBorderTwoTone'
import IconButton from '@mui/material/IconButton'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

interface ItemProps {
	job: Job
	openMenu: (ev: React.MouseEvent) => void
}

const Item: React.FC<ItemProps> = ({ job, openMenu }) => {
	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell component='th' scope='row'>
				{job.name}
			</TableCell>
			<TableCell align='left'>{job.department}</TableCell>
			<TableCell align='left'>{job.categories?.[0]}</TableCell>
			<TableCell align='left'>GTQ{job.salary}</TableCell>
			<TableCell align='left'>
				{'STAR!'
					.split('')
					.map((_a, index) =>
						index < job.score ? (
							<StarTwoToneIcon style={{ opacity: 0.7 }} key={`start_${index}`} />
						) : (
							<StarBorderTwoTone style={{ opacity: 0.7 }} key={`start_${index}`} />
						)
					)}
			</TableCell>
			<TableCell align='center'>
				<IconButton onClick={openMenu}>
					<MoreVertTwoToneIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

export default Item
