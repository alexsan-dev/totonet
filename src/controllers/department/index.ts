// IMPORTS
import { Controller } from 'models/global'
import DepartmentService from 'services/department'

// CONTROLADOR
const depController: Controller = (app) => {
	// SERVICIOS
	const service = new DepartmentService()

	// ENDPOINTS
	app.get('/departments', service.getDepartments)
}

export default depController
