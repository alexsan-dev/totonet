import React from 'react'

import UploadView from './components/upload'
import UsersView from './components/users'

import Styles from './style.module.scss'

const DashboardView: React.FC = () => (
	<div className={Styles.container}>
		<div className={Styles.content}>
			<UploadView />
			<UsersView />
		</div>
	</div>
)

export default DashboardView
