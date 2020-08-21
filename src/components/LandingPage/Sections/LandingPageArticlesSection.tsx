import React from 'react'
import { Link } from 'gatsby'

import { H2 } from '../../basic/Heading'

import './LandingPageArticlesSection.scss'

const ArticleItem = ({ title, children, image }) => {
	return (
		<div className="ArticleItem">
			<div className="cover">
				<img alt={title} src={image} />
			</div>
			<div className="text">
				<h3>{title}</h3>
				<p>{children}</p>
			</div>
		</div>
	)
}

const LandingPageArticlesSection = () => {
	return (
		<section className="LandingPageArticlesSection">
			<div className="container">
				<H2>Articles</H2>

				<div className="articles">
					<ArticleItem
						title={'Les 10 conseils en 2020'}
						image={
							'https://images.unsplash.com/photo-1516820208784-270b250306e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80'
						}
					>
						Qu’on soit chef d’entreprise, infirmier ou médecin, bien choisir sa
						prévoyance reste pour beaucoup un vérit....
					</ArticleItem>
					<ArticleItem
						title={'Les 10 conseils en 2020'}
						image={`https://images.unsplash.com/photo-1431036101494-66a36de47def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80`}
					>
						Qu’on soit chef d’entreprise, infirmier ou médecin, bien choisir sa
						prévoyance reste pour beaucoup un vérit....
					</ArticleItem>
					<ArticleItem
						title={'Les 10 conseils en 2020'}
						image={`https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80`}
					>
						Qu’on soit chef d’entreprise, infirmier ou médecin, bien choisir sa
						prévoyance reste pour beaucoup un vérit....
					</ArticleItem>
				</div>

				<div className="link">
					<Link to="/articles">Tous les articles</Link>
				</div>
			</div>
		</section>
	)
}
export default LandingPageArticlesSection
