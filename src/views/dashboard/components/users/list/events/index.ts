import authFetch from 'utils/tools'

/**
 * Borrar usuario
 * @description Borrar usuario en la db
 * @param user
 */
const deleteUser = (user?: User, onSuccess?: () => void): void => {
	// PETICION
	authFetch(`http://localhost:5000/user/${user?.id}`, { method: 'DELETE' })
		.then((res) => res?.json())
		.then((data) => {
			if (data.success) {
				window.Snack(`${user?.name} eliminado correctamente.`)
				if (onSuccess) onSuccess()
			}
		})
}

export default deleteUser
