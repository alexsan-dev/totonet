// IMPORTS
import { Controller } from 'models/global'
import AuthService from 'services/auth'

// CONTROLADOR
const dataController: Controller = (app) => {
	// SERVICIOS
	const service = new AuthService()

	// ENDPOINTS
	app.post('/login', service.login)
}

export default dataController
