// IMPORTS
import { Controller } from 'models/global'
import StorageService from 'services/storage'

// CONTROLADOR
const storageController: Controller = (app) => {
	// SERVICIOS
	const service = new StorageService()

	// ENDPOINTS
	app.get('/storage/:id', service.getFile)
}

export default storageController
