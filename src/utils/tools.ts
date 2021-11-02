/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */

/**
 * Peticion OAuth
 * @description Crear peticion fetch con cookie
 * @param input
 * @param init
 * @returns
 */
const authFetch = async (
	input: Request | string,
	// eslint-disable-next-line no-undef
	init?: RequestInit
): Promise<Response | null> => {
	// OBTENER COOKIE
	const parseCookie = (str: string) =>
		str
			.split(';')
			.map((v) => v.split('='))
			.reduce((acc, v) => {
				// @ts-ignore
				acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim())
				return acc
			}, {})

	const cookie = parseCookie(document.cookie) as { token?: string; role?: string }

	// COOKIE
	if (cookie.token?.length && cookie.role?.length) {
		return fetch(input, {
			...init,
			headers: { ...init?.headers, authorization: cookie.token },
			body: JSON.stringify({
				...JSON.parse(init?.body as string),
				user: {
					...JSON.parse(init?.body as string).user,
					role: cookie.role,
				},
			}),
		})
	}

	// REGRESAR AL LOGIN
	window.location.replace('/')
	return null
}

export default authFetch
