// IMPORTS
import withAuth from 'middlewares'
import { Controller } from 'models/global'
import DepartmentService from 'services/department'

// CONTROLADOR
const depController: Controller = (app) => {
	// SERVICIOS
	const service = new DepartmentService()

	// ENDPOINTS
	app.get('/departments', withAuth('admin'), service.getDepartments)
}

export default depController
