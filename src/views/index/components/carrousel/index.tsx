import React, { useState } from 'react'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import JobCard from './components/card'
import Styles from './style.module.scss'
import showApplyForm from '../list/components/form'
import showScores from '../list/components/score'

interface CarrouselProps {
	jobs: Job[]
	setUpdate: React.Dispatch<React.SetStateAction<number>>
}

const Carrousel: React.FC<CarrouselProps> = ({ jobs, setUpdate }) => {
	// PASOS
	const [activeStep, setActiveStep] = useState(0)

	// MENU
	const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)

	// CERRAR MENU
	const handleClose = () => setMenuAnchor(null)

	// ABRIR MENU
	const openMenu = (ev: React.MouseEvent) =>
		setMenuAnchor(ev.currentTarget as HTMLButtonElement | null)

	// APLICAR A PUESTO
	const applyToJob = () => {
		showApplyForm(jobs[activeStep])
		handleClose()
	}

	// CALIFICAR A PUESTO
	const scoreJob = () => {
		showScores(setUpdate, jobs[activeStep])
		handleClose()
	}

	const maxSteps = jobs.length

	// AVANZAR
	const handleStep = (step: number) => () =>
		setActiveStep((prevActiveStep) => prevActiveStep + step)

	return (
		<div className={Styles.container}>
			<JobCard job={jobs[activeStep]} openMenu={openMenu} />
			<MobileStepper
				variant='text'
				steps={maxSteps}
				position='static'
				activeStep={activeStep}
				nextButton={
					<Button
						variant='outlined'
						className={Styles.control}
						onClick={handleStep(1)}
						endIcon={<KeyboardArrowRight />}
						disabled={activeStep === maxSteps - 1}>
						Siguiente
					</Button>
				}
				backButton={
					<Button
						variant='outlined'
						className={Styles.control}
						onClick={handleStep(-1)}
						startIcon={<KeyboardArrowLeft />}
						disabled={activeStep === 0}>
						Anterior
					</Button>
				}
			/>
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

export default Carrousel
