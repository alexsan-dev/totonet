/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import useUserToken from 'hooks/auth'
import { Redirect } from 'react-router'

function withAuth<T>(Page: React.FC<T>): React.FC<T> {
	const AuthPage: React.FC<T> = (props: T) => {
		// HOOK DE TOKEN
		const token = useUserToken()

		// RENDER
		if (token?.token?.length) return <Page {...props} />

		// REDIRECT
		return <Redirect to='/login' />
	}

	return AuthPage
}

export default withAuth
