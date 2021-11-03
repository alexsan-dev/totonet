import React, { useRef } from 'react'
import { parseCookie } from 'utils/tools'

/**
 * Hook de token
 * @description Utilizar token desde cookie
 * @returns
 */
const useUserToken = (): UserToken | null => {
	const tokenRef: React.MutableRefObject<UserToken | null> = useRef(null)
	const cookie = parseCookie(document.cookie) as UserToken
	tokenRef.current = cookie
	return tokenRef.current
}

export default useUserToken
