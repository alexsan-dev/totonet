// IMPORTS
import { Controller } from 'models/global'
import JobService from 'services/job'

// CONTROLADOR
const jobController: Controller = (app) => {
	// SERVICIOS
	const service = new JobService()

	// ENDPOINTS
	app.get('/jobs', service.getJobs)
}

export default jobController
