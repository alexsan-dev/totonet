// IMPORTS
import { Controller } from 'models/global'
import ModelService from 'services/model'

// CONTROLADOR
const modelController: Controller = (app) => {
	// SERVICIOS
	const service = new ModelService()

	// ENDPOINTS
	app.get('/setModel', service.setModel)
}

export default modelController
