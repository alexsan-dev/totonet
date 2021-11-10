/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import useUserToken from 'hooks/auth'
import { useHistory } from 'react-router-dom'

import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'

import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone'
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone'
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone'
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone'
import ReplayTwoTone from '@mui/icons-material/ReplayTwoTone'

import { filterJobs } from 'views/index/components/list/events'
import Info from 'components/info'
import Item from './components/item'

import Styles from './style.module.scss'

import useJobs from './hooks'

const ApplyJobsList: React.FC = () => {
	// USUARIO
	const token = useUserToken()

	// ESTADOS
	const [jobs, setJobs] = useState<JobApply[]>([])

	// ACTUALIZACIONES
	const [updates, setUpdates] = useState<number>(0)

	// HISTORY
	const history = useHistory()

	// ACTUALIZAR
	const addUpdate = () => setUpdates(updates + 1)

	// HOOKS
	useJobs(updates, setJobs, history, token?.uid)

	// APLICAR FILTROS
	const setFilter = (filter: keyof JobApply) => () => filterJobs(filter, setJobs)

	return (
		<div>
			<Info
				button='Recargar datos'
				icon={<ReplayTwoTone />}
				title='Postulaciones de trabajo'
				buttonProps={{ onClick: addUpdate }}
				body='Aqui puedes ver todas las postulaciones.'
			/>
			<TableContainer component={Paper} className={Styles.table}>
				<Table stickyHeader>
					<TableHead className={Styles.tHead}>
						<TableRow>
							<TableCell align='left' onClick={setFilter('name')}>
								<WorkTwoToneIcon color='primary' />
								Nombre del puesto
							</TableCell>
							<TableCell align='left' onClick={setFilter('lastName')}>
								<DomainTwoToneIcon color='primary' />
								Departamento
							</TableCell>
							<TableCell align='left' onClick={setFilter('email')} sx={{ maxWidth: '200px' }}>
								<EventTwoToneIcon color='primary' />
								Fecha de postulacion
							</TableCell>
							<TableCell align='left' onClick={setFilter('phone')}>
								<CheckCircleTwoToneIcon color='primary' />
								Estado
							</TableCell>
							<TableCell align='left' onClick={setFilter('cui')}>
								<BorderColorTwoToneIcon color='primary' />
								Editar expediente
							</TableCell>
							<TableCell align='left' onClick={setFilter('jobName')}>
								<DescriptionTwoToneIcon color='primary' />
								Requisitos
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{jobs?.map((job) => (
							<Item key={job.date} job={job} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default ApplyJobsList
