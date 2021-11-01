import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// PAGINAS
import Index from 'pages'

const Router: React.FC = () => (
	<BrowserRouter>
		<Route exact path="/" component={Index} />
	</BrowserRouter>
)

export default Router
