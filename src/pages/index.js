import React, { useEffect, useState, useRef } from 'react'
// import { useFirebase } from '../components/contexts/Firebase'

import { Button } from '../components/basic/Button'
import { useSession } from '../components/context/Session'
import { MicroCopy } from '../components/basic/MicroCopy'

import BackgroundImage from 'gatsby-background-image'
import { graphql } from 'gatsby'
import { useLayout } from '../components/layout'

import '../style/snoweffect.scss'
import { FLEX, FLEX_COLUMN } from '../style/structure'

// import * as firebase from 'firebase'

const Wave = ({ before = false }) => {
	const waves = [
		{
			d:
				'M0,224L60,224C120,224,240,224,360,240C480,256,600,288,720,250.7C840,213,960,107,1080,80C1200,53,1320,107,1380,133.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
			opacity: 1,
			dy: 0,
			height: 150
		},
		{
			d:
				'M0,160L60,170.7C120,181,240,203,360,186.7C480,171,600,117,720,122.7C840,128,960,192,1080,224C1200,256,1320,256,1380,256L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
			opacity: 0.5,
			dy: 20,
			height: 150
		},
		{
			d:
				'M0,128L60,154.7C120,181,240,235,360,256C480,277,600,267,720,234.7C840,203,960,149,1080,149.3C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
			opacity: 0.7,
			dy: 10,
			height: 150
		},
		{
			d:
				'M0,32L48,32C96,32,192,32,288,64C384,96,480,160,576,208C672,256,768,288,864,266.7C960,245,1056,171,1152,133.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
			opacity: 0.2,
			dy: -30,
			height: 100
		}
	]

	return (
		<>
			{waves.map((wave, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						left: 0,
						bottom: before ? 'auto' : 0,
						top: before ? 0 : 'auto',
						right: 0,
						zIndex: 4000,
						transform: `scaleY(${((50 + i * 20) * (before ? -1 : 1)) /
							100}) translateY(${50 - i * 20}%)`
					}}
				>
					<svg
						preserveAspectRatio="none"
						viewBox="0 0 1440 320"
						width="100%"
						height={wave.height}
						style={{
							marginBottom: -5 + wave.dy
						}}
					>
						<path fill="#f2f2f2" fill-opacity={wave.opacity} d={wave.d}></path>
					</svg>
				</div>
			))}
		</>
	)
}

const SnowEffect = () => {
	const [snowParticules, setSnowParticules] = useState([])
	const [, setTabIsFocused] = useState(true)

	const containerRef = useRef(null)

	useEffect(() => {
		let i = 0
		const interval = setInterval(() => {
			setTabIsFocused(tabIsFocused => {
				if (tabIsFocused) {
					setSnowParticules(snowParticules => [
						{
							key: i++,
							left: Math.round(Math.random() * window.innerWidth),
							blur: Math.round(Math.random() * 3),
							width: Math.round(2 + Math.random() * 3),
							animationClass:
								Math.random() > 0.5
									? 'fall-animation-left'
									: 'fall-animation-right'
						},
						...snowParticules.slice(0, window.innerWidth / 20)
					])
				}

				return tabIsFocused
			})
		}, 50)

		function setFocused() {
			setTabIsFocused(true)
		}
		function setUnfocused() {
			setTabIsFocused(false)
		}

		window.addEventListener('focus', setFocused)
		window.addEventListener('blur', setUnfocused)

		return () => {
			clearInterval(interval)
			window.removeEventListener('focus', setFocused)
			window.removeEventListener('blur', setUnfocused)
		}
	}, [])
	return (
		<div
			ref={containerRef}
			style={{
				position: 'absolute',
				left: 0,
				top: 0,
				right: 0,
				bottom: 0,
				overflow: 'hidden',
				pointerEvents: 'none'
			}}
		>
			{snowParticules.map(particule => (
				<div
					key={particule.key}
					style={{
						position: 'absolute',
						height: particule.width,
						width: particule.width,
						backgroundColor: 'white',
						left: particule.left,
						top: -10,
						borderRadius: 100,
						filter: `blur(${particule.blur}px)`
					}}
					className={particule.animationClass}
				/>
			))}
		</div>
	)
}

const IndexPage = ({ data }) => {
	const session = useSession()

	// const { user, auth, firestore, storage, functions } = useFirebase()

	// console.log(auth, firestore, storage, functions)

	// const signIn = () => {
	// 	firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
	// 	// auth().signInWithPopup(new auth.GoogleAuthProvider())
	// }
	// const signout = () => {
	// 	firebase.auth().signOut()
	// }

	useEffect(useLayout().useMainTheme, [])

	return (
		<div>
			{/* <BackgroundImage
				Tag="section"
				fluid={data.background.childImageSharp.fluid}
				style={{
					position: 'relative',
					backgroundPositionY: 'top',
					backgroundAttachment: 'fixed',
					backgroundSize: '100% auto'
				}}
			> */}
			<div
				style={{
					position: 'relative',
					backgroundImage: 'linear-gradient(to bottom, #1f3040,#687a90)',
					overflow: 'hidden'
				}}
			>
				<img
					src="/images/mountains/1.png"
					style={{
						position: 'absolute',
						left: 0,
						bottom: -200,
						width: '100%',
						zIndex: 3000
					}}
					className="mountain1"
				/>
				<img
					src="/images/mountains/2.png"
					style={{
						position: 'absolute',
						left: 0,
						bottom: -250,
						width: '100%',
						zIndex: 2000
					}}
					className="mountain2"
				/>
				<img
					src="/images/mountains/3.png"
					style={{
						position: 'absolute',
						left: 0,
						bottom: -250,
						width: '100%',
						zIndex: 1000
					}}
					className="mountain3"
				/>
				<SnowEffect />
				<img
					className="browse-screen-x"
					src="/images/cloud2.png"
					alt=""
					style={{
						opacity: 0.35,
						position: 'absolute',
						zIndex: 2500,
						top: 130,
						left: 10
					}}
				/>
				{/*
				<img
					className="browse-screen-x-slow"
					src="/images/cloud2.png"
					alt=""
					style={{
						opacity: 0.35,
						position: 'absolute',
						zIndex: 9999999999,
						top: 0,
						left: 0
					}}
				/>
				<img
					className="browse-screen-x-reverse"
					src="/images/cloud2.png"
					alt=""
					style={{
						opacity: 0.35,
						position: 'absolute',
						zIndex: 9999999999,
						top: 0,
						left: 0
					}}
				/> */}
				<div
					className="hero color-light"
					style={{
						zIndex: 9000000
					}}
				>
					<div className="container text-center">
						<h1
							style={{
								textShadow: '0 0 20px rgba(0,0,0,0.5)'
							}}
						>
							Votre protection sociale. Simplement.
						</h1>
						<div
							className="subtitle"
							style={{
								textShadow: '0 0 10px rgba(0,0,0,1)'
							}}
						>
							Trouvez les meilleurs contrats, en moins de 5 minutes.
						</div>

						{/* <div className="mobile-only">MOBILE</div>
				<div className="desktop-only">DESKTOP</div> */}

						<Button>
							<MicroCopy id="button.demarrer" />
						</Button>
					</div>
				</div>

				<Wave />
			</div>

			<div className="hero small">
				<div className="large-container">
					<div style={FLEX_COLUMN} className="text-center">
						<div style={FLEX(1)}>
							<div style={{ margin: 15, height: '100%' }} className="box">
								<div>
									<img
										src="/images/icons/002-agent.svg"
										style={{ height: 60, opacity: 0.7 }}
									/>
								</div>
								<h3>A votre service</h3>
								<p className="color-grey">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
									provident dignissimos ex, doloremque.
								</p>
							</div>
						</div>
						<div style={FLEX(1)}>
							<div style={{ margin: 15, height: '100%' }} className="box">
								<div>
									<img
										src="/images/icons/018-shield.svg"
										style={{ height: 60, opacity: 0.7 }}
									/>
								</div>
								<h3>Les meilleurs assurance au meilleur prix</h3>
								<p className="color-grey">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
									provident dignissimos ex, doloremque.
								</p>
							</div>
						</div>
						<div style={FLEX(1)}>
							<div style={{ margin: 15, height: '100%' }} className="box">
								<div>
									<img
										src="/images/icons/017-insurance.svg"
										style={{ height: 60, opacity: 0.7 }}
									/>
								</div>
								<h3>Une protection sur mesure</h3>
								<p className="color-grey">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
									provident dignissimos ex, doloremque.
								</p>
							</div>
						</div>
					</div>

					<div
						style={{
							...FLEX_COLUMN,
							marginTop: 15
						}}
						className="text-center"
					>
						<div style={FLEX(1)}>
							<div style={{ margin: 15, height: '100%' }} className="box">
								<div>
									<img
										src="/images/icons/014-document.svg"
										style={{ height: 60, opacity: 0.7 }}
									/>
								</div>
								<h3>Un espace client simple et efficace</h3>
								<p className="color-grey">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
									provident dignissimos ex, doloremque.
								</p>
							</div>
						</div>
						<div style={FLEX(1)}>
							<div style={{ margin: 15, height: '100%' }} className="box">
								<div>
									<img
										src="/images/icons/005-briefcase.svg"
										style={{ height: 60, opacity: 0.7 }}
									/>
								</div>
								<h3>Des démarches simplifiées</h3>
								<p className="color-grey">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
									provident dignissimos ex, doloremque.
								</p>
							</div>
						</div>
						<div style={FLEX(1)}>
							<div style={{ margin: 15, height: '100%' }} className="box">
								<div>
									<img
										src="/images/icons/038-life insurance.svg"
										style={{ height: 60, opacity: 0.7 }}
									/>
								</div>
								<h3>Soyez tranquille</h3>
								<p className="color-grey">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
									provident dignissimos ex, doloremque.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className="hero medium bg-dark"
				style={{
					position: 'relative'
				}}
			>
				<Wave before={true} />
				<Wave />
				<div className="large-container">
					<h2 className="text-center">Préparez votre retraite</h2>

					<p className="measure">
						Avoir une retraite descente n'est aujourd'hui plus une certitude,
						nous vous aidons a prendre les devants avec des placements
						d'exception.
					</p>

					<div className="text-center">
						<Button className="">Faire une simulation gratuite</Button>
					</div>
				</div>
			</div>

			<div
				className="hero small"
				style={{
					position: 'relative'
				}}
			>
				<div className="large-container">
					<h2 className="text-center">Nos partenaires</h2>

					<div className="text-center">
						<div style={FLEX_COLUMN}>
							<div style={FLEX(1)}>
								<i className="fab fa-apple fa-5x" />
								<h3>Joe le colodo</h3>
							</div>
							<div style={FLEX(1)}>
								<i className="fab fa-canadian-maple-leaf fa-5x" />
								<h3>Joe le colodo</h3>
							</div>
							<div style={FLEX(1)}>
								<i className="fab fa-mendeley fa-5x" />
								<h3>Joe le colodo</h3>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className="hero medium bg-primary"
				style={{
					position: 'relative'
				}}
			>
				<Wave before={true} />
				<Wave />
				<div className="large-container">
					<h2 className="text-center">Nos partenaires assureurs</h2>

					<div className="text-center">
						<div style={FLEX_COLUMN}>
							<div style={FLEX(1)}>
								<i className="fab fa-swift fa-5x" />
								<h3>SwissLife</h3>
							</div>
							<div style={FLEX(1)}>
								<i className="fab fa-swift fa-5x" />
								<h3>SwissLife</h3>
							</div>
							<div style={FLEX(1)}>
								<i className="fab fa-swift fa-5x" />
								<h3>SwissLife</h3>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className="hero small"
				style={{
					position: 'relative'
				}}
			>
				<div className="large-container">
					<h2 className="text-center">L'actu</h2>

					<div className="text-center">
						<div style={FLEX_COLUMN}>
							<div style={FLEX(1)}>
								<h3>Joe le colodo</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
									cum fugit quibusdam porro, ipsum amet ad possimus? Doloribus
									quo repellat, dolorem ducimus nisi molestiae, provident
									reprehenderit recusandae odit ab tenetur.
								</p>
							</div>
							<div style={FLEX(1)}>
								<h3>Joe le colodo</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
									cum fugit quibusdam porro, ipsum amet ad possimus? Doloribus
									quo repellat, dolorem ducimus nisi molestiae, provident
									reprehenderit recusandae odit ab tenetur.
								</p>
							</div>
							<div style={FLEX(1)}>
								<h3>Joe le colodo</h3>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
									cum fugit quibusdam porro, ipsum amet ad possimus? Doloribus
									quo repellat, dolorem ducimus nisi molestiae, provident
									reprehenderit recusandae odit ab tenetur.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className="hero medium bg-primary"
				style={{
					position: 'relative'
				}}
			>
				<Wave before={true} />
				<div className="large-container">
					<h2 className="text-center">Contactons nous</h2>

					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ab
						ipsam odit dolores incidunt! Recusandae, eum distinctio
						exercitationem facere assumenda obcaecati, architecto debitis
						voluptatem eligendi corrupti quaerat aperiam, eveniet asperiores.
					</p>

					<div className="text-center">
						<Button className="dark">Prendre rendez-vous</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default IndexPage

export const pageQuery = graphql`
	query HomeQuery {
		background: file(
			relativePath: { eq: "background/rohit-tandon-ku79qGpxWXQ-unsplash.jpg" }
		) {
			childImageSharp {
				fluid(quality: 100, maxWidth: 4160) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`
