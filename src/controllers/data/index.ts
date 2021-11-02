// IMPORTS
import { Controller } from 'models/global'
import DataService from 'services/data'
import withAuth from 'middlewares'

// CONTROLADOR
const dataController: Controller = (app) => {
	// SERVICIOS
	const service = new DataService()

	// ENDPOINTS
	app.post('/upload', withAuth, service.upload)
}

export default dataController
