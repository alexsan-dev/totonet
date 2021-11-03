/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */

import { RouteComponentProps } from 'react-router'

/**
 * Parser cookie
 * @description Convierte document.cookie en un objeto
 * @param str
 * @returns
 */
export const parseCookie = (str: string): UserToken =>
	str
		.split(';')
		.map((v) => v.split('='))
		.reduce((acc, v) => {
			// @ts-ignore
			acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim())
			return acc
		}, {})

/**
 * Peticion OAuth
 * @description Crear peticion fetch con cookie
 * @param input
 * @param init
 * @returns
 */
const authFetch = async (
	history: RouteComponentProps['history'],
	input: Request | string,
	// eslint-disable-next-line no-undef
	init?: RequestInit,
	includeRole?: boolean
): Promise<Response | null> => {
	const cookie = parseCookie(document.cookie) as UserToken

	// COOKIE
	if (cookie.token?.length && cookie.role?.length) {
		return fetch(input, {
			...init,
			headers: { ...init?.headers, authorization: cookie.token },
			body: includeRole
				? init?.body
					? JSON.stringify({
							...JSON.parse(init?.body as string),
							user: JSON.parse(init?.body as string).user
								? {
										...JSON.parse(init?.body as string).user,
										role: cookie.role,
								  }
								: undefined,
					  })
					: undefined
				: init?.body,
		})
	}

	// REGRESAR AL LOGIN
	history?.replace('/login')
	return null
}

export default authFetch
