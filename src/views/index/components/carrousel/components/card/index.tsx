/* eslint-disable react/no-array-index-key */
import React from 'react'

// MATERIAL
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'

// ICONOS
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone'
import ImageTwoTone from '@mui/icons-material/ImageTwoTone'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// ESTILOS
import Styles from './style.module.scss'

interface JobCardProps {
	job?: Job
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
	return (
		<Card sx={{ maxWidth: 400 }}>
			<CardHeader
				className={Styles.header}
				avatar={
					<Avatar sx={{ backgroundColor: 'var(--primary)' }} aria-label='recipe'>
						{job?.name.toUpperCase().charAt(0)}
					</Avatar>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={job?.name.toLowerCase()}
				subheader={job?.department}
			/>
			{(job?.image?.length || 0) > 0 ? (
				<CardMedia component='img' height='195' image={job?.image} alt={`${job?.name}_img`} />
			) : (
				<div className={Styles.image}>
					<ImageTwoTone />
				</div>
			)}
			<CardContent>
				<div className={Styles.chips}>
					{job?.categories.map((category) => (
						<Chip label={category} key={category} />
					))}
				</div>
				<div className={Styles.req}>
					<Typography variant='h6'>Descripción</Typography>
					<Typography variant='body1'>Requisitos: {`${job?.requirements.length}`}</Typography>
					<Typography variant='body1'>Salario: {`GTQ${job?.salary}`}</Typography>
				</div>
			</CardContent>
			<CardActions>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon color='secondary' />
				</IconButton>
				<IconButton aria-label='share'>
					<ChatTwoToneIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

JobCard.defaultProps = {
	job: undefined,
}

export default JobCard
