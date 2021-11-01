// IMPORTS
import { Controller } from 'models/global'
import DataService from 'services/data'

// CONTROLADOR
const dataController: Controller = (app) => {
	// SERVICIOS
	const service = new DataService(true, true)

	// ENDPOINTS
	app.get('/upload', service.upload)
}

export default dataController
