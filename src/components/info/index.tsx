/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import Typography from '@mui/material/Typography'
import Button, { ButtonProps } from '@mui/material/Button'
import Styles from './style.module.scss'

interface InfoProps {
	title: string
	body: string
	icon: JSX.Element
	button: string
	buttonProps?: ButtonProps
}
const Info: React.FC<InfoProps> = ({ title, body, icon, button, buttonProps }) => {
	return (
		<div className={Styles.info}>
			<div>
				<Typography variant='h5'>{title}</Typography>
				<Typography variant='body1'>{body}</Typography>
			</div>
			<Button fullWidth variant='contained' startIcon={icon} {...buttonProps}>
				{button}
			</Button>
		</div>
	)
}

Info.defaultProps = {
	buttonProps: undefined,
}

export default Info
