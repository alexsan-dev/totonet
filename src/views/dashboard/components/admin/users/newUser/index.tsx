import React from 'react'
import NewUserForm from './components/form'

const showUser = (user?: User, onSuccess?: () => void, preview?: boolean): void => {
	window.Alert({
		title: '',
		body: '',
		type: preview ? 'alert' : 'window',
		fixed: !preview,
		resetOnHide: true,
		hideActions: !preview,
		customElements: <NewUserForm user={user} onSuccess={onSuccess} preview={preview} />,
	})
}
export default showUser
