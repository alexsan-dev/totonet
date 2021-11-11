import React from 'react'
import ReqForm from './components/form'

const showReq = (update: () => void, currentJob?: JobApply): void => {
	window.Alert({
		title: `Actualizar expediente`,
		body: 'Llena el siguiente formulario y espera hasta que un revisor te contacte. 👌',
		type: 'confirm',
		hideActions: true,
		resetOnHide: true,
		customElements: <ReqForm update={update} currentJob={currentJob} />,
	})
}

export default showReq
