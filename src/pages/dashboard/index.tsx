import withAuth from 'hoc/auth'
import React from 'react'
import DashboardView from 'views/dashboard'

const Dashboard: React.FC = () => <DashboardView />

export default withAuth(Dashboard)
