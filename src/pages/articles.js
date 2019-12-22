import React, { useEffect } from 'react'
import { useLayout } from '../components/layout'

const Articles = ({}) => {
	useEffect(useLayout().useLightBgTheme, [])

	return (
		<div className="hero">
			<div className="container">
				<h1>Articles</h1>
			</div>
		</div>
	)
}
export default Articles
