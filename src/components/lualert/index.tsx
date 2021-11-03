/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable react-hooks/exhaustive-deps
// REACT
import React, { useState, useEffect } from 'react'

// COMPONENTES
import Button from '@mui/material/Button'

// ESTILOS
import Styles from './style.module.scss'

// UTILS
import defState, { InternalState, HOCProps } from './utils/models'

// TEMPLATE
const AlertTemplate: React.FC<HOCProps> = (props) => {
	// ESTADO
	const [state, setState] = useState<InternalState>(defState)

	// SHOW ALERT
	const show = (aProps: AlertProps | string): void => {
		if (typeof aProps === 'string')
			setState({
				...defState,
				type: 'alert',
				title: '',
				body: aProps as string,
				open: true,
			})
		else {
			setState({
				...defState,
				...aProps,
				title: (aProps as AlertProps).title,
				body: (aProps as AlertProps).body,
				cancelText: aProps.cancelText ? (aProps as AlertProps).cancelText : undefined,
				confirmText: aProps.confirmText ? (aProps as AlertProps).confirmText : undefined,
				open: true,
			})
		}
	}

	// HIDE ALERT
	const hide = (): void => {
		if (state.onCancel) state.onCancel()

		if (!state.fixed) {
			const tmpNested: AlertProps | string | undefined = state.nested
			setState((prevState: InternalState) => {
				if (tmpNested) {
					show(tmpNested)
					return prevState
				}
				return { ...prevState, open: false, nested: undefined }
			})

			if (state.resetOnHide && !tmpNested)
				setTimeout(() => {
					setState({ ...defState })
				}, 300)

			if (state.onHide) state.onHide()
		}
	}

	// FORCE TO HIDE
	const forceHide = (): void => {
		setState((prevState: InternalState) => ({ ...prevState, open: false }))
		setTimeout(() => {
			setState({ ...defState })
		}, 300)
	}

	// CONFIRM
	const confirm = (): void => {
		if (state.onConfirm) state.onConfirm()
		if (!state.hasNextAlert) hide()
	}

	// GLOBAl
	useEffect(() => {
		window.Alert = show
		window.hideAlert = forceHide
	})

	return (
		<div
			onClick={state.type === 'window' ? hide : undefined}
			className={`${Styles.alertContainer} ${state.open ? Styles.openAlert : Styles.closeAlert}`}
			style={
				state.open
					? {
							backdropFilter: props.blurred ? 'blur(10px)' : 'none',
							zIndex: state.zIndex || props.zIndex || 100,
					  }
					: {
							backdropFilter: props.blurred ? 'blur(10px)' : 'none',
							zIndex: state.zIndex || props.zIndex || 100,
					  }
			}>
			<div
				className={`${Styles.alertContent} ${
					state.open ? Styles.openContent : Styles.closeContent
				}`}
				style={
					state.open
						? {
								maxWidth: state.maxWidth ? `${state.maxWidth}px` : '455px',
								width: state.margins ? `calc(100% - ${state.margins * 2}px)` : 'calc(100% - 60px)',
						  }
						: {
								maxWidth: state.maxWidth ? `${state.maxWidth}px` : '455px',
								width: state.margins ? `calc(100% - ${state.margins * 2}px)` : 'calc(100% - 60px)',
						  }
				}>
				<div className={Styles.alertBody}>
					{state.type !== 'alert' && state.title.length > 0 && (
						<h1 className={Styles.alertContentH1}>{state.title}</h1>
					)}
					<p
						className={Styles.alertContentP}
						style={{
							fontSize: state.type === 'alert' ? '1.2em' : '1em',
						}}>
						{state.body}
					</p>
					{state.customElements}
				</div>

				{state.type !== 'window' && !state.hideActions && (
					<ul className={Styles.alertActions}>
						{!state.fixed && state.type === 'confirm' && (
							<li>
								{!state.cancelBtn ? (
									<Button
										onClick={hide}
										sx={{
											color: '#555',
											background: 'transparent',
											padding: '10px 15px',
										}}>
										{state.cancelText || props.cancelText || 'Cancel'}
									</Button>
								) : (
									<div onClick={hide}>{state.cancelBtn}</div>
								)}
							</li>
						)}
						<li>
							{!state.confirmBtn ? (
								<Button
									onClick={confirm}
									variant='contained'
									startIcon={state.confirmIcon}
									sx={{
										color: '#fff',
										padding: '10px 15px',
										background:
											state.type === 'error'
												? props.errColor || '#ff5252'
												: props.confirmColor || '#2196f3',
									}}>
									{state.confirmText || props.confirmText || 'Accept'}
								</Button>
							) : (
								<div onClick={confirm}>{state.confirmBtn}</div>
							)}
						</li>
					</ul>
				)}
			</div>
		</div>
	)
}

// DEFAULT
AlertTemplate.defaultProps = {
	confirmColor: '#2196f3',
	confirmText: 'Confirm',
	cancelText: 'Cancel',
	errColor: '#ff5252',
	blurred: false,
	zIndex: 1,
}

export default AlertTemplate
