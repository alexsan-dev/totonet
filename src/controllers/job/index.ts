// IMPORTS
import withAuth from 'middlewares'
import { Controller } from 'models/global'
import JobService from 'services/job'

// CONTROLADOR
const jobController: Controller = (app) => {
	// SERVICIOS
	const service = new JobService()

	// ENDPOINTS
	app.get('/jobs', service.getJobs)

	app.post('/jobs/apply', service.newApply)
	app.put('/jobs/apply/:id', withAuth('recruiter'), service.acceptApply)
	app.post('/jobs/apply/all', withAuth('recruiter'), service.getApps)
	app.post('/jobs/score', service.setScore)
}

export default jobController
