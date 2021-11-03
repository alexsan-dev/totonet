import React, { useState } from 'react'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import Info from 'components/info'
import UsersList from './list'
import Styles from './style.module.scss'
import showUser from './newUser'

const UsersView: React.FC = () => {
	// ACTUALIZAR USUARIOS
	const [updateCounter, setUpdateCounter] = useState<number>(0)

	// NUEVO USUARIO
	const newUserForm = () => showUser(undefined, () => setUpdateCounter(updateCounter + 1))

	return (
		<section className={Styles.container}>
			<Info
				button='Nuevo usuario'
				title='Lista de usuarios'
				icon={<AddCircleTwoToneIcon />}
				buttonProps={{ onClick: newUserForm }}
				body='Crea, edita y elimina usuarios en el sistema.'
			/>
			<UsersList extUpdateCounter={updateCounter} />
		</section>
	)
}

export default UsersView
