/* eslint-disable no-console */
import React from "react"
import verifyEmail from "../tools"

// DATOS
export interface LoginData {
  email?: HTMLInputElement | boolean | string
  password?: HTMLInputElement | boolean | string
}

const onSubmit = (ev: React.FormEvent<HTMLFormElement>, setErrs:React.Dispatch<React.SetStateAction<LoginData>>) => {
		ev.preventDefault()

		// DATOS
		const formData = ((ev.target as HTMLFormElement).elements) as unknown as LoginData
    const data = {email:(formData.email as HTMLInputElement)?.value, password:(formData.password as HTMLInputElement)?.value }

    // MOSTRAR ERRORES
    const validData = { email:!verifyEmail(data.email || ''), password: !(data.password?.length)} 
    setErrs(validData)

    if(!validData.email && !validData.password){
      console.log(data)
    }
	}

  export default onSubmit