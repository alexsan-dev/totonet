import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// PAGINAS
import Dashboard from 'pages/dashboard'
import Upload from 'pages/upload'
import Index from 'pages'

const Router: React.FC = () => (
	<BrowserRouter>
		<Route exact path='/' component={Index} />
		<Route exact path='/dashboard' component={Dashboard} />
		<Route exact path='/upload' component={Upload} />
	</BrowserRouter>
)

export default Router
