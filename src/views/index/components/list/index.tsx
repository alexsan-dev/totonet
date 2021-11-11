import React, { useState, useEffect } from 'react'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone'
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone'
import DomainTwoToneIcon from '@mui/icons-material/DomainTwoTone'
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone'
import MoreTwoToneIcon from '@mui/icons-material/MoreTwoTone'
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone'
import SearchTwoTone from '@mui/icons-material/SearchTwoTone'
import InputAdornment from '@mui/material/InputAdornment'

import TextField from '@mui/material/TextField'
import Info from 'components/info'
import Item from './components/item'
import showApplyForm from './components/form'

import Styles from './style.module.scss'
import searchJob, { filterJobs } from './events'
import showScores from './components/score'

// PROPS
interface JobsListProps {
	jobs: Job[]
	setUpdate: React.Dispatch<React.SetStateAction<number>>
}

const JobsList: React.FC<JobsListProps> = ({ jobs, setUpdate }) => {
	// LISTA
	const [stateJobs, setJobs] = useState<Job[]>(jobs)

	// MENU
	const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)
	const [currentJob, setCurrentJob] = useState<Job | undefined>()

	// CERRAR MENU
	const handleClose = () => setMenuAnchor(null)

	// BUSCAR
	const searchHandler = (ev: React.ChangeEvent<HTMLInputElement>) => searchJob(ev, setJobs, jobs)

	// APLICAR A PUESTO
	const applyToJob = () => {
		showApplyForm(currentJob)
		handleClose()
	}

	// CALIFICAR A PUESTO
	const scoreJob = () => {
		showScores(setUpdate, currentJob)
		handleClose()
	}

	// APLICAR FILTROS
	const setFilter = (filter: keyof Job) => () => filterJobs(filter, setJobs)

	// ABRIR MENU
	const openMenu = (job: Job) => (ev: React.MouseEvent) => {
		setCurrentJob(job)
		setMenuAnchor(ev.currentTarget as HTMLButtonElement | null)
	}

	// ACTUALIZAR LISTA
	useEffect(() => {
		setJobs(jobs)
	}, [jobs])

	return (
		<div>
			<Info
				title='Todos los puestos'
				body='Aplica a todos los puestos que te interesen.'
				action={
					<TextField
						type='search'
						name='search'
						defaultValue=''
						label='Buscar puesto'
						onChange={searchHandler}
						placeholder='Desarrollador'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchTwoTone />
								</InputAdornment>
							),
						}}
					/>
				}
			/>
			<TableContainer component={Paper} className={Styles.table}>
				<Table stickyHeader>
					<TableHead className={Styles.tHead}>
						<TableRow>
							<TableCell align='left' onClick={setFilter('name')}>
								<PersonTwoToneIcon color='primary' />
								Nombre
							</TableCell>
							<TableCell align='left' onClick={setFilter('department')}>
								<DomainTwoToneIcon color='primary' />
								Departamento
							</TableCell>
							<TableCell align='left' onClick={setFilter('categories')}>
								<CategoryTwoToneIcon color='primary' />
								Categoria
							</TableCell>
							<TableCell align='left' onClick={setFilter('salary')}>
								<MonetizationOnTwoToneIcon color='primary' />
								Salario
							</TableCell>
							<TableCell align='left' onClick={setFilter('score')}>
								<StarTwoToneIcon color='primary' />
								Puntuación
							</TableCell>
							<TableCell align='center'>
								<MoreTwoToneIcon color='primary' />
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{stateJobs?.map((job) => (
							<Item key={job.userId} job={job} openMenu={openMenu(job)} />
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
				<MenuItem onClick={applyToJob}>Aplicar</MenuItem>
				<MenuItem onClick={scoreJob}>Puntuar</MenuItem>
			</Menu>
		</div>
	)
}

export default JobsList
