import React from 'react'
import XMLViewer from 'react-xml-viewer'
import Typography from '@mui/material/Typography'

import Styles from './style.module.scss'

interface XmlViewerProps {
	xml: string
	name: string
}
const XmlViewer: React.FC<XmlViewerProps> = ({ xml, name }) => (
	<div className={Styles.container}>
		<Typography variant='body1'>{name}</Typography>
		<XMLViewer
			xml={xml}
			invalidXml={
				<div>
					<Typography variant='body1'>Aqui se visualizara tu archivo xml...</Typography>
				</div>
			}
			theme={{
				overflowBreak: true,
				tagColor: 'var(--primary)',
			}}
		/>
	</div>
)

export default XmlViewer
