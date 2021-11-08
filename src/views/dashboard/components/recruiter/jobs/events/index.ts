import { RouteComponentProps } from 'react-router'
import authFetch from 'utils/tools'

/**
 * Aceptar aplicacion
 * @description Aceptar o rechazar aplicacion a puesto de guest
 * @param history
 * @param accept
 * @param job
 */
const sendJobAccept = (
	history: RouteComponentProps['history'],
	accept: boolean,
	job?: JobApply
): void => {
	if (job) {
		authFetch(
			history,
			`http://localhost:5000/jobs/apply/${job.applyId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ accept, job }),
			},
			true
		)
			.then((res) => res?.json())
			.then((data) => {
				if (data?.success)
					window.Snack(`Puesto ${accept ? 'Aceptado' : 'Rechazado'} correctamente.`)
				else window.Snack('Error al confirmar puesto')
			})
			.catch((err) => window.Snack(err.toString()))
	}
}

export default sendJobAccept
