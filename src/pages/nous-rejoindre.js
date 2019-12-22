import React, { useEffect } from 'react'
import { useLayout } from '../components/layout'

const NousRejoindre = ({}) => {
	useEffect(useLayout().useLightBgTheme, [])

	return (
		<div className="hero">
			<div className="container">
				<h1>Nous rejoindre</h1>
			</div>
		</div>
	)
}
export default NousRejoindre
