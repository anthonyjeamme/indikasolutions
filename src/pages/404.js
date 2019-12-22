import React, { useEffect } from 'react'
import { FULLSCREEN_CENTERED } from '../style/structure'
import { LogoSquare } from '../components/basic/Logo'
import { Link } from 'gatsby'
import { useLayout } from '../components/layout'

const NotFoundPage = () => {
	useEffect(useLayout().useLightBgTheme, [])

	return (
		<div style={FULLSCREEN_CENTERED}>
			<h1>Cette page n'existe pas</h1>
			<div>
				<Link to="/">Retourner à l'accueil</Link>
			</div>
		</div>
	)
}

export default NotFoundPage
