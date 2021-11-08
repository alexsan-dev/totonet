import React from 'react'

const showPDF = (job?: JobApply): void => {
	if (job) {
		window.Alert({
			title: `Curriculum de ${job.name}`,
			body: '',
			type: 'confirm',
			customElements: (
				<iframe title='cv' width='400' height='500' src={`file://${job.cv as unknown as string}`}>
					<a href='./resources/crayola.pdf'>Download PDF</a>
				</iframe>
			),
		})
	}
}

export default showPDF
