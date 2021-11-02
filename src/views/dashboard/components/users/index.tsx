import React from 'react'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import Info from 'components/info'
import UsersList from './list'
import Styles from './style.module.scss'

const UsersView: React.FC = () => {
	return (
		<section className={Styles.container}>
			<Info
				button='Nuevo usuario'
				title='Lista de usuarios'
				icon={<AddCircleTwoToneIcon />}
				body='Crea, edita y elimina usuarios en el sistema.'
			/>
			<UsersList />
		</section>
	)
}

export default UsersView
