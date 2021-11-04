import React, { useState } from 'react'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import useJobs from './hooks'
import JobCard from './components/card'
import Styles from './style.module.scss'

const Carrousel: React.FC = () => {
	// PASOS
	const [activeStep, setActiveStep] = useState(0)

	// PUESTOS
	const [jobs, setJobs] = useState<Job[]>([])

	const maxSteps = jobs.length

	// AVANZAR
	const handleStep = (step: number) => () =>
		setActiveStep((prevActiveStep) => prevActiveStep + step)

	// HOOKS
	useJobs(setJobs)

	return (
		<div className={Styles.container}>
			<JobCard job={jobs[activeStep]} />
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
		</div>
	)
}

export default Carrousel
