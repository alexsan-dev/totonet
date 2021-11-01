import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// PAGINAS
import Dashboard from 'pages/dashboard'
import Index from 'pages'

const Router: React.FC = () => (
	<BrowserRouter>
		<Route exact path="/" component={Index} />
		<Route exact path="/dashboard" component={Dashboard} />
	</BrowserRouter>
)

export default Router
