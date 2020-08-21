import React from 'react'
import { Link } from 'gatsby'

import { formatPhoneNumber } from '../../utils/utils'
import Information from '../basic/Information'
import { FLEX_COLUMN, FLEX } from '../../style/structure'

import './Footer.scss'

const Footer = ({}) => {
	return (
		<footer className="Footer">
			<div className="container">
				<div>
					<Link to="/mentions" className="item">
						Mentions Légales
					</Link>
					<Link to="/cgu" className="item">
						CGU
					</Link>
				</div>

				<div>
					<div className="item">
						Indika Assurance & Patrimoine © - Tous droits réservés
					</div>
				</div>
			</div>
		</footer>
	)
}
export default Footer

/*
	<footer className="layout-footer Footer">
			<div className="container">
				<div style={FLEX_COLUMN}>
					<div style={FLEX(1)}>
						<h4 className="text-center">En savoir plus</h4>

						<ul className="no-style margin-0">
							<li>
								<Link to="/qui-sommes-nous">Qui sommes-nous ?</Link>
							</li>
							<li>
								<Link to="/nous-rejoindre">Nous rejoindre</Link>
							</li>
							<li>
								<Link to="/faq">FAQ</Link>
							</li>
							<li>
								<Link to="/articles">Articles</Link>
							</li>
							<li>
								<Link to="/cookies-preferences">Préférences de cookies</Link>
							</li>
						</ul>
					</div>
					<div style={FLEX(1)}>
						<h4 className="text-center">Contact</h4>

						<Information name="adresse" />

						<Information name="telephone">
							{value => (
								<a href={`tel:${value}`}>
									<i className="fas fa-phone"></i> {formatPhoneNumber(value)}
								</a>
							)}
						</Information>
					</div>
				</div>
			</div>
		</footer>

*/
