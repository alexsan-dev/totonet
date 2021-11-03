import { RouteComponentProps } from 'react-router'

/**
 * Cerrar sesion
 * @description Cerrar sesion y borrar cookies
 * @param history
 */
const logout = (history: RouteComponentProps['history']): void => {
	document.cookie = `role=0; SameSite=strict; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
	document.cookie = `token=0; SameSite=strict; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
	history.push('/login')
}

export default logout
