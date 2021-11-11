import { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import authFetch from 'utils/tools'

const useReq = (history: RouteComponentProps['history'], applyId?: number): void => {
	useEffect(() => {
		authFetch(history, `http://localhost:5000/apply/${applyId ?? 0}/requirements`, {
			method: 'GET',
		})
			.then((res) => res?.json())
			.then((data) => {
				if (data?.success) {
					console.log(data)
				}
			})
	}, [])
}

export default useReq
