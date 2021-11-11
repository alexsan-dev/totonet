/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import { useHistory } from 'react-router-dom'
import useReq from './hooks'

interface ReqFormProps {
	update: () => void
	currentJob?: JobApply
}
const ReqForm: React.FC<ReqFormProps> = ({ currentJob }) => {
	// HISTORY
	const history = useHistory()

	// HOOKS
	useReq(history, currentJob?.applyId)

	return <></>
}

ReqForm.defaultProps = {
	currentJob: undefined,
}

export default ReqForm
