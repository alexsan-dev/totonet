import Button from '@mui/material/Button'
import Topbar from 'components/topbar'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import LoginTwoTone from '@mui/icons-material/LoginTwoTone'
import Carrousel from './components/carrousel'
import JobsList from './components/list'

import useJobs from './hooks'

import Styles from './style.module.scss'

const IndexView: React.FC = () => {
	// PUESTOS
	const [jobs, setJobs] = useState<Job[]>([])

	// HOOKS
	useJobs(setJobs)

	return (
		<>
			<Topbar
				title='Totonet© | Jobs'
				action={
					<Link to='/login' className={Styles.login}>
						<Button variant='outlined' color='inherit' startIcon={<LoginTwoTone />}>
							Iniciar sesión
						</Button>
					</Link>
				}
			/>
			<div className={Styles.container}>
				<div className={Styles.content}>
					<Carrousel jobs={jobs} />
					<JobsList jobs={jobs} />
				</div>
			</div>
		</>
	)
}

export default IndexView
