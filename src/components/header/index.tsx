import React from 'react'

import Styles from './style.module.scss'

interface HeaderProps {
	img: string
}
const Header: React.FC<HeaderProps> = ({ img }) => {
	return (
		<div className={Styles.container}>
			<img src={img} alt='Header' />
		</div>
	)
}

export default Header
