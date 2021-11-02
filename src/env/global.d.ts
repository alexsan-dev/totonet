/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
interface Window {
	Snack: (body: string) => void
	Alert: (props: AlertProps | string) => unknown
	hideAlert: () => unknown
}

interface AlertProps {
	type: 'confirm' | 'window' | 'alert' | 'error'
	customElements?: JSX.Element
	nested?: AlertProps | string
	confirmIcon?: JSX.Element
	confirmBtn?: JSX.Element
	cancelBtn?: JSX.Element
	onConfirm?: () => unknown
	hasNextAlert?: boolean
	hideActions?: boolean
	resetOnHide?: boolean
	confirmText?: string
	onCancel?: () => unknown
	cancelText?: string
	onHide?: () => unknown
	maxWidth?: number
	margins?: number
	fixed?: boolean
	zIndex?: number
	title: string
	body: string
}