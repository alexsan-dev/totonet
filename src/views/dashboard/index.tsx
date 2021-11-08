import React from 'react'

// HOOKS
import useUserToken from 'hooks/auth'

// SECCIONES DE ADMIN
import Topbar from 'components/topbar'
import UploadView from './components/admin/upload'
import UsersView from './components/admin/users'

// SECCIONES DE REVISOR
import JobsList from './components/recruiter/jobs'

// ESTILOS
import Styles from './style.module.scss'

const DashboardView: React.FC = () => {
	// LEER TOKEN
	const token = useUserToken()

	return (
		<div className={Styles.container}>
			<Topbar />
			<div className={Styles.content}>
				{(token?.role === 'admin' && (
					<>
						<UploadView />
						<UsersView />
					</>
				)) ||
					(token?.role === 'recruiter' && (
						<>
							<JobsList />
						</>
					))}
			</div>
		</div>
	)
}

export default DashboardView
