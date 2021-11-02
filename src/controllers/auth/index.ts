// IMPORTS
import { Controller } from 'models/global'
import AuthService from 'services/auth'

// CONTROLADOR
const authController: Controller = (app) => {
	// SERVICIOS
	const service = new AuthService()

	// ENDPOINTS
	app.post('/login', service.login)
	app.post('/signing', service.signing)
}

export default authController
