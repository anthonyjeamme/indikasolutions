import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { useLayout } from '../components/layout'

const BlogIndex = () => {
	useEffect(useLayout().useLightBgTheme, [])

	const isBrowser = () => typeof window !== 'undefined'

	const [cookieAccepted, setCookieAccepted] = useState(
		isBrowser() && localStorage.getItem('cookieAccepted') === 'true'
	)

	const updateCookieAccepted = () => {
		if (isBrowser()) localStorage.setItem('cookieAccepted', 'true')
		setCookieAccepted('true')
	}

	const cleanData = () => {
		localStorage.clear()
		sessionStorage.clear()
		alert('Les données ont bien été effacées')
	}

	return (
		<div className="container margin-top-2">
			<div className="hero large">
				<div className="hero-body">
					<div className="box text-center">
						<h1 className="margin-top-1">Mes préférences de cookies</h1>

						<label
							className="measure margin-auto margin-top-2 margin-bottom-2"
							style={{ display: 'flex', cursor: 'pointer' }}
						>
							<div>
								<input
									className="is-checkradio margin-right-0-5"
									style={{ verticalAlign: 'middle' }}
									type="checkbox"
									name="exampleCheckbox"
									checked={cookieAccepted}
									onChange={e => {
										setCookieAccepted(e.target.checked)
										localStorage.setItem('cookieAccepted', e.target.checked)
									}}
								/>
							</div>

							<div className="text-left" style={{ flex: 1 }}>
								J'accepte l’utilisation de cookies, utiles au fonctionnement du
								site et à des fins de mesure d'audience.
							</div>
						</label>

						<div>
							<button className="" onClick={cleanData}>
								Effacer mes données locales
							</button>
						</div>

						<hr />

						<div className="has-text-right">
							<Link to="/">
								<button className="button medium info">
									<i className="fas fa-long-arrow-alt-left"></i> Retour
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogIndex
