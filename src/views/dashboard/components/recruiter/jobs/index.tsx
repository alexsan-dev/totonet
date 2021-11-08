/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import useUserToken from 'hooks/auth'
import { useHistory } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone'
import PersonAddAlt1TwoToneIcon from '@mui/icons-material/PersonAddAlt1TwoTone'
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone'
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone'
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone'
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone'
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { filterJobs } from 'views/index/components/list/events'
import Item from './components/item'

import Styles from './style.module.scss'

import useJobs from './hooks'
import sendJobAccept from './events'
import showPDF from './components/pdf'

const JobsList: React.FC = () => {
	// USUARIO
	const token = useUserToken()

	// ESTADOS
	const [jobs, setJobs] = useState<JobApply[]>([])

	// MENU
	const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)
	const [currentJob, setCurrentJob] = useState<JobApply | undefined>()

	// HISTORY
	const history = useHistory()

	// CERRAR MENU
	const handleClose = () => setMenuAnchor(null)

	// ABRIR MENU
	const openMenu = (job: JobApply) => (ev: React.MouseEvent) => {
		setCurrentJob(job)
		setMenuAnchor(ev.currentTarget as HTMLButtonElement | null)
	}

	// ACEPTAR / RECHAZAR
	const handleJobAccept = (accept: boolean) => () => sendJobAccept(history, accept, currentJob)

	// MOSTRAR CV
	const showCv = () => {
		showPDF(currentJob)
		handleClose()
	}

	// HOOKS
	useJobs(setJobs, history, token?.uid)

	// APLICAR FILTROS
	const setFilter = (filter: keyof JobApply) => () => filterJobs(filter, setJobs)

	return (
		<div>
			<TableContainer component={Paper} className={Styles.table}>
				<Table stickyHeader>
					<TableHead className={Styles.tHead}>
						<TableRow>
							<TableCell align='left' onClick={setFilter('name')}>
								<PersonOutlineTwoToneIcon color='primary' />
								Nombre
							</TableCell>
							<TableCell align='left' onClick={setFilter('lastName')}>
								<PersonAddAlt1TwoToneIcon color='primary' />
								Apellido
							</TableCell>
							<TableCell align='left' onClick={setFilter('email')} sx={{ maxWidth: '200px' }}>
								<EmailTwoToneIcon color='primary' />
								Correo
							</TableCell>
							<TableCell align='left' onClick={setFilter('phone')}>
								<LocalPhoneTwoToneIcon color='primary' />
								Telefono
							</TableCell>
							<TableCell align='left' onClick={setFilter('cui')}>
								<RecentActorsTwoToneIcon color='primary' />
								Cui
							</TableCell>
							<TableCell align='left' onClick={setFilter('jobName')}>
								<WorkTwoToneIcon color='primary' />
								Puesto
							</TableCell>
							<TableCell align='left' onClick={setFilter('date')}>
								<EventTwoToneIcon color='primary' />
								Fecha de postulación
							</TableCell>
							<TableCell align='center'>
								<MoreVertTwoToneIcon color='primary' />
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{jobs?.map((job) => (
							<Item key={job.date} job={job} openMenu={openMenu(job)} />
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
				<MenuItem onClick={handleJobAccept(true)}>Aceptar</MenuItem>
				<MenuItem onClick={handleJobAccept(false)}>Rechazar</MenuItem>
				<MenuItem onClick={showCv}>Ver CV</MenuItem>
			</Menu>
		</div>
	)
}

export default JobsList
