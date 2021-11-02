// IMPORTS
import withAuth from 'middlewares'
import { Controller } from 'models/global'
import UserService from 'services/user'

// CONTROLADOR
const userController: Controller = (app) => {
	// SERVICIOS
	const service = new UserService()

	// ENDPOINTS
	app.delete('/user/:id', service.getUser)
	app.put('/user/:id', service.getUser)
	app.get('/user/:id', withAuth('admin'), service.getUser)
	app.get('/users', withAuth('admin'), service.getUsers)
	app.post('/user', service.getUser)
}

export default userController
