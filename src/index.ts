// IMPORTS
import fileUpload from 'express-fileupload'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// DB
import startDb from 'utils/db'

// CONTROLLERS
import storageController from 'controllers/storage'
import applyController from 'controllers/applicant'
import depController from 'controllers/department'
import modelController from 'controllers/model'
import dataController from 'controllers/data'
import authController from 'controllers/auth'
import userController from 'controllers/user'
import jobController from 'controllers/job'

// APP
const app = express()

// MIDDLEWARE
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.static('./storage'))
app.use(
	fileUpload({
		limits: { fileSize: 50 * 1024 * 1024 },
	}),
)

// SETTINGS
startDb()
dotenv.config()

// CONTROLADORES
storageController(app)
applyController(app)
modelController(app)
dataController(app)
authController(app)
userController(app)
depController(app)
jobController(app)

// INICIAR APP
app.listen(5000, () => console.log('http://localhost:5000'))
