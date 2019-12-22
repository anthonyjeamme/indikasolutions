import React, { useEffect } from 'react'
import { useLayout } from '../components/layout'

const About = ({}) => {
	useEffect(useLayout().useLightBgTheme, [])

	return (
		<div className="hero">
			<div className="container">
				<h1>Qui sommes-nous?</h1>
			</div>
		</div>
	)
}
export default About
