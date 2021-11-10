// IMPORTS
import { Controller } from 'models/global'
import ApplicantService from 'services/applicant'
import withAuth from 'middlewares'

// CONTROLADOR
const applyController: Controller = (app) => {
	// SERVICIOS
	const service = new ApplicantService()

	// ENDPOINTS
	app.get('/apply/:id', withAuth('apply'), service.getJobs)
	app.put('/apply/:id', withAuth('apply'), service.updateApply)
}

export default applyController
