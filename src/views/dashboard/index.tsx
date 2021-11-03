import React from 'react'

// HOOKS
import useUserToken from 'hooks/auth'

// SECCIONES DE ADMIN
import UploadView from './components/admin/upload'
import UsersView from './components/admin/users'

// SECCIONES DE COORDINADOR

// ESTILOS
import Styles from './style.module.scss'

const DashboardView: React.FC = () => {
	// LEER TOKEN
	const token = useUserToken()

	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				{(token?.role === 'admin' && (
					<>
						<UploadView />
						<UsersView />
					</>
				)) ||
					(token?.role === 'coord' && <></>)}
			</div>
		</div>
	)
}

export default DashboardView
