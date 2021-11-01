/**
 * Verificar correo
 * @description Verifica un string 'email' con una expresión regular
 * @param  {string} email
 */
const verifyEmail = (email: string): boolean => {
	// REGEX DE EMAIL
	const rg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return rg.test(String(email).toLowerCase())
}

export default verifyEmail
