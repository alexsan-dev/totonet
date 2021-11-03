// ALERT STATE
export interface InternalState extends AlertProps {
	open: boolean
}

export interface HOCProps {
	confirmColor?: string
	confirmText?: string
	cancelText?: string
	errColor?: string
	blurred?: boolean
	zIndex?: number
}

// DEFAULT STATE
const defState: InternalState = {
	customElements: undefined,
	confirmText: undefined,
	cancelText: undefined,
	confirmBtn: undefined,
	onConfirm: undefined,
	cancelBtn: undefined,
	maxWidth: undefined,
	onCancel: undefined,
	hasNextAlert: false,
	hideActions: false,
	resetOnHide: false,
	margins: undefined,
	zIndex: undefined,
	onHide: undefined,
	fixed: undefined,
	type: 'alert',
	open: false,
	title: '',
	body: '',
}

export default defState
