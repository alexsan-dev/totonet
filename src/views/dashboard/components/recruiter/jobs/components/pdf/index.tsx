import React from 'react'

const showPDF = (job?: JobApply): void => {
	if (job) {
		window.Alert({
			title: `Curriculum de ${job.name}`,
			body: '',
			type: 'confirm',
			customElements: (
				<iframe
					title='cv'
					height={500}
					width='100%'
					src={`http://localhost:5000/storage/${job?.cv?.toString() ?? ''}`}
				/>
			),
		})
	}
}

export default showPDF
