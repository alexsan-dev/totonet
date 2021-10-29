// IMPORTS
import express from 'express'
import cors from 'cors'

// DB
import { startDb } from 'utils/db'

// CONTROLLERS
import modelController from 'controllers/model'

// APP
const app = express()
app.use(cors({ origin: '*' }))
startDb()

// CONTROLADORES
modelController(app)

// INICIAR APP
app.listen(5000, () => {
	console.log('Start on localhost:5000')
})
