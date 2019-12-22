import React, { useEffect } from 'react'
import { useLayout } from '../components/layout'

const FAQ = ({}) => {
	useEffect(useLayout().useLightBgTheme, [])

	return (
		<div className="hero">
			<div className="container">
				<h1>FAQ</h1>
			</div>
		</div>
	)
}
export default FAQ
