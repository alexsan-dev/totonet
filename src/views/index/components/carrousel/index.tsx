import React, { useState } from 'react'
import MobileStepper from '@mui/material/MobileStepper'
import Button from '@mui/material/Button'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import JobCard from './components/card'
import Styles from './style.module.scss'

interface CarrouselProps {
	jobs: Job[]
}

const Carrousel: React.FC<CarrouselProps> = ({ jobs }) => {
	// PASOS
	const [activeStep, setActiveStep] = useState(0)

	const maxSteps = jobs.length

	// AVANZAR
	const handleStep = (step: number) => () =>
		setActiveStep((prevActiveStep) => prevActiveStep + step)

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
