import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

import Box from '../Box'

import LandingPageArticlesSection from './Sections/LandingPageArticlesSection'
import { H2 } from '../basic/Heading'

import './LandingPage.scss'
import LandingPageContactSection from './Sections/LandingPageContactSection'

const Icon = () => (
	<svg
		width="69"
		height="75"
		viewBox="0 0 69 75"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="38.5135"
			cy="45.2703"
			r="29.7297"
			fill="#133547"
			fillOpacity="0.1"
		/>
		<path
			d="M38.9712 11.9167H35.7018V8.60692C35.7018 8.31431 35.587 8.0337 35.3826 7.8268C35.1783 7.6199 34.9011 7.50366 34.612 7.50366H30.2528C29.9638 7.50366 29.6866 7.6199 29.4822 7.8268C29.2779 8.0337 29.163 8.31431 29.163 8.60692V11.9167H25.8936C25.6046 11.9167 25.3274 12.0329 25.123 12.2398C24.9187 12.4467 24.8038 12.7273 24.8038 13.0199V17.4329C24.8038 17.7255 24.9187 18.0062 25.123 18.2131C25.3274 18.42 25.6046 18.5362 25.8936 18.5362H29.163V21.846C29.163 22.1386 29.2779 22.4192 29.4822 22.6261C29.6866 22.833 29.9638 22.9492 30.2528 22.9492H34.612C34.9011 22.9492 35.1783 22.833 35.3826 22.6261C35.587 22.4192 35.7018 22.1386 35.7018 21.846V18.5362H38.9712C39.2603 18.5362 39.5375 18.42 39.7418 18.2131C39.9462 18.0062 40.061 17.7255 40.061 17.4329V13.0199C40.061 12.7273 39.9462 12.4467 39.7418 12.2398C39.5375 12.0329 39.2603 11.9167 38.9712 11.9167ZM37.8814 16.3297H34.612C34.323 16.3297 34.0458 16.4459 33.8414 16.6528C33.637 16.8597 33.5222 17.1403 33.5222 17.4329V20.7427H31.3426V17.4329C31.3426 17.1403 31.2278 16.8597 31.0234 16.6528C30.8191 16.4459 30.5419 16.3297 30.2528 16.3297H26.9834V14.1232H30.2528C30.5419 14.1232 30.8191 14.007 31.0234 13.8001C31.2278 13.5931 31.3426 13.3125 31.3426 13.0199V9.71017H33.5222V13.0199C33.5222 13.3125 33.637 13.5931 33.8414 13.8001C34.0458 14.007 34.323 14.1232 34.612 14.1232H37.8814V16.3297Z"
			fill="#133547"
		/>
		<path
			d="M62.6526 17.8301C62.6747 17.636 62.6856 17.4408 62.6853 17.2454C62.68 16.2341 62.3335 15.255 61.7032 14.4705C61.0729 13.6859 60.1967 13.143 59.2198 12.9317C58.1148 12.7187 56.9711 12.9387 56.0202 13.547C55.0693 14.1553 54.3821 15.1066 54.0977 16.2083L49.3026 30.1755C49.2315 30.2041 49.1624 30.2372 49.0955 30.2748L39.4617 35.9897C37.9875 36.8663 36.7648 38.1171 35.9143 39.6186C35.0638 41.12 34.6149 42.8201 34.6121 44.5509V54.9436C34.3231 54.9436 34.0459 55.0598 33.8415 55.2667C33.6371 55.4736 33.5223 55.7542 33.5223 56.0468V64.8729C33.5223 65.1655 33.6371 65.4461 33.8415 65.653C34.0459 65.8599 34.3231 65.9761 34.6121 65.9761H49.8693C50.1583 65.9761 50.4355 65.8599 50.6399 65.653C50.8443 65.4461 50.9591 65.1655 50.9591 64.8729V56.0468C50.9591 55.7542 50.8443 55.4736 50.6399 55.2667C50.4355 55.0598 50.1583 54.9436 49.8693 54.9436V52.5164C49.8713 52.0504 49.9693 51.59 50.1569 51.1645C50.3446 50.739 50.6178 50.3578 50.9591 50.0451L58.3261 43.4146C59.132 42.7008 59.7088 41.7595 59.9826 40.7116L64.7124 22.8058C64.8133 22.4319 64.8646 22.046 64.8649 21.6584C64.8607 20.8798 64.6539 20.1161 64.2656 19.4441C63.8772 18.7721 63.3209 18.2154 62.6526 17.8301ZM56.1792 16.8592C56.313 16.2887 56.6543 15.7901 57.135 15.463C57.6157 15.1358 58.2006 15.0041 58.773 15.094C59.2614 15.1976 59.7 15.4677 60.0154 15.8593C60.3308 16.2509 60.5039 16.7401 60.5057 17.2454V17.2674C59.5323 17.2857 58.5914 17.6254 57.8261 18.2348C57.0609 18.8442 56.5132 19.6899 56.2664 20.6434L53.2259 30.1424C52.7655 29.9214 52.272 29.7797 51.7655 29.7232L56.1792 16.8592ZM48.7795 63.7696H35.7019V57.1501H48.7795V63.7696ZM62.609 22.2321L57.8684 40.1489C57.7044 40.7715 57.3633 41.3316 56.8876 41.7597L49.5097 48.3902C48.9388 48.9114 48.4819 49.5478 48.1685 50.2584C47.855 50.969 47.6919 51.7382 47.6897 52.5164V54.9436H36.7917V44.5509C36.7971 43.2049 37.1474 41.8833 37.8083 40.7153C38.4692 39.5473 39.4182 38.5729 40.5624 37.8873L50.1853 32.1834C50.4335 32.0371 50.7077 31.9418 50.9923 31.9031C51.2769 31.8644 51.5662 31.883 51.8437 31.9578C52.1212 32.0327 52.3813 32.1623 52.6092 32.3392C52.837 32.5161 53.0281 32.7369 53.1714 32.9888C53.4545 33.4986 53.5325 34.0992 53.3893 34.6658C53.3136 34.9455 53.1842 35.2074 53.0084 35.4365C52.8327 35.6655 52.614 35.8573 52.3649 36.0007L46.1204 39.6525C45.8832 39.8051 45.7134 40.0447 45.6465 40.321C45.5797 40.5974 45.6209 40.8893 45.7615 41.1356C45.9022 41.382 46.1314 41.5638 46.4014 41.6431C46.6714 41.7224 46.9611 41.693 47.2102 41.5611L53.4547 37.9093C53.9539 37.6226 54.3913 37.2378 54.7413 36.7773C55.0913 36.3169 55.3467 35.7903 55.4927 35.2284C55.7893 34.0996 55.6326 32.8978 55.0567 31.8856L54.9914 31.7863L58.3588 21.2723C58.4926 20.7017 58.8339 20.2032 59.3146 19.876C59.7953 19.5488 60.3802 19.4171 60.9526 19.507C61.441 19.6106 61.8796 19.8808 62.195 20.2723C62.5104 20.6639 62.6835 21.1532 62.6853 21.6584C62.689 21.8524 62.6633 22.0459 62.609 22.2321Z"
			fill="#133547"
		/>
		<path
			d="M30.2529 54.9436V44.5509C30.25 42.8201 29.8012 41.12 28.9507 39.6185C28.1002 38.1171 26.8774 36.8663 25.4033 35.9896L15.7694 30.2638C15.704 30.2307 15.6278 30.2086 15.5624 30.1755L10.7999 16.2855C10.5231 15.1677 9.83602 14.1987 8.87839 13.5756C7.92076 12.9525 6.7646 12.7222 5.64519 12.9316C4.66829 13.1429 3.79205 13.6859 3.16174 14.4704C2.53143 15.255 2.18491 16.2341 2.17963 17.2454C2.17935 17.4408 2.19026 17.636 2.21232 17.8301C1.54402 18.2154 0.987719 18.7721 0.599367 19.4441C0.211016 20.1161 0.00430687 20.8798 3.05176e-05 21.6584C0.00214719 22.0452 0.0497058 22.4303 0.141704 22.8058L4.88233 40.7005C5.15324 41.7529 5.73038 42.6985 6.53883 43.4145L13.895 50.0451C14.2397 50.3556 14.5159 50.7361 14.7056 51.1619C14.8952 51.5878 14.9941 52.0493 14.9957 52.5164V54.9436C14.7066 54.9436 14.4294 55.0598 14.2251 55.2667C14.0207 55.4736 13.9059 55.7542 13.9059 56.0468V64.8728C13.9059 65.1654 14.0207 65.4461 14.2251 65.653C14.4294 65.8599 14.7066 65.9761 14.9957 65.9761H30.2529C30.5419 65.9761 30.8191 65.8599 31.0235 65.653C31.2278 65.4461 31.3427 65.1654 31.3427 64.8728V56.0468C31.3427 55.7542 31.2278 55.4736 31.0235 55.2667C30.8191 55.0598 30.5419 54.9436 30.2529 54.9436ZM4.35923 17.2454C4.36057 16.7417 4.53211 16.2536 4.84534 15.8622C5.15858 15.4709 5.59465 15.1998 6.08111 15.094C6.66923 15.0076 7.26788 15.1495 7.75701 15.4912C8.24613 15.8329 8.58956 16.3491 8.71843 16.9365L13.0994 29.7232C12.593 29.7797 12.0994 29.9214 11.6391 30.1424L8.62034 20.6985C8.37467 19.7357 7.82592 18.88 7.05711 18.2609C6.2883 17.6419 5.34125 17.2931 4.35923 17.2674V17.2454ZM15.3444 48.3902L7.97736 41.7597C7.499 41.3293 7.15763 40.7649 6.99654 40.1379L2.24502 22.2321C2.19991 22.0443 2.17794 21.8516 2.17963 21.6584C2.18097 21.1547 2.35251 20.6666 2.66575 20.2753C2.97898 19.8839 3.41505 19.6128 3.90151 19.507C4.4855 19.4183 5.08101 19.5567 5.56827 19.8945C6.05553 20.2322 6.39841 20.7441 6.52793 21.3274L9.87361 31.7863L9.80823 31.8855C9.23237 32.8978 9.07565 34.0996 9.37231 35.2284C9.51822 35.7903 9.77369 36.3169 10.1237 36.7773C10.4737 37.2377 10.9111 37.6226 11.4102 37.9093L17.6548 41.5611C17.9038 41.693 18.1936 41.7224 18.4636 41.6431C18.7335 41.5638 18.9628 41.382 19.1034 41.1356C19.2441 40.8893 19.2853 40.5974 19.2184 40.321C19.1516 40.0446 18.9818 39.8051 18.7446 39.6525L12.5 36.0007C12.251 35.8573 12.0323 35.6655 11.8565 35.4365C11.6808 35.2074 11.5513 34.9455 11.4756 34.6657C11.3324 34.0992 11.4105 33.4986 11.6936 32.9888C11.836 32.7374 12.0259 32.5169 12.2525 32.3398C12.479 32.1628 12.7379 32.0326 13.0141 31.9568C13.2904 31.881 13.5787 31.861 13.8626 31.898C14.1465 31.935 14.4204 32.0282 14.6687 32.1724L24.3026 37.8872C25.4468 38.5729 26.3957 39.5473 27.0567 40.7153C27.7176 41.8833 28.0679 43.2049 28.0733 44.5509V54.9436H17.1753V52.5164C17.1734 51.737 17.0094 50.9668 16.694 50.2559C16.3785 49.545 15.9187 48.9093 15.3444 48.3902ZM29.1631 63.7696H16.0855V57.1501H29.1631V63.7696Z"
			fill="#133547"
		/>
		<path
			d="M47.8499 3.23624C46.8382 2.21025 45.6366 1.39631 44.3138 0.840995C42.991 0.285681 41.573 -0.000102446 40.141 2.75484e-08C38.709 0.000102501 37.291 0.286089 35.9683 0.841592C34.6456 1.39709 33.4441 2.21121 32.4325 3.23734C31.421 2.21118 30.2196 1.39706 28.8969 0.841586C27.5742 0.28611 26.1563 0.000187309 24.7244 0.000187309C23.2924 0.000187309 21.8745 0.28611 20.5518 0.841586C19.2291 1.39706 18.0277 2.21118 17.0162 3.23734C14.9765 5.30669 13.8309 8.11067 13.8309 11.034C13.8309 13.9574 14.9765 16.7614 17.0162 18.8307L31.6631 33.6585C31.8675 33.8653 32.1446 33.9815 32.4336 33.9815C32.7226 33.9815 32.9997 33.8653 33.2041 33.6585L47.851 18.8307C49.8906 16.761 51.036 13.9568 51.0358 11.0333C51.0356 8.10971 49.8898 5.30563 47.8499 3.23624ZM32.4325 31.3185L18.5561 17.2707C17.3378 16.0358 16.5086 14.4629 16.1733 12.7509C15.8379 11.0389 16.0115 9.26466 16.672 7.65251C17.3325 6.04037 18.4504 4.66266 19.8842 3.69357C21.3181 2.72448 23.0036 2.2075 24.7276 2.208C25.8729 2.20402 27.0074 2.43093 28.0652 2.87549C29.1229 3.32006 30.0826 3.97337 30.8883 4.79734L31.662 5.58065C31.8664 5.78748 32.1435 5.90367 32.4325 5.90367C32.7215 5.90367 32.9986 5.78748 33.203 5.58065L33.9789 4.79514C34.788 3.97459 35.749 3.32362 36.8068 2.87946C37.8647 2.43531 38.9987 2.20669 40.1439 2.20669C41.2892 2.20669 42.4232 2.43531 43.481 2.87946C44.5389 3.32362 45.4998 3.97459 46.3089 4.79514C47.9414 6.44999 48.8583 8.69311 48.8583 11.0318C48.8583 13.3706 47.9414 15.6137 46.3089 17.2685L32.4325 31.3185Z"
			fill="#133547"
		/>
	</svg>
)

const Separator = () => (
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 1400 51"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="none"
	>
		<path
			d="M564.5 32.337C390 16.6305 201.5 -4.42482 0 27.173V51H1400V0C1151.5 45.816 739 48.0435 564.5 32.337Z"
			fill="#F6F8FC"
		/>
	</svg>
)

const LandingPage = () => {
	const backgroundImage = useStaticQuery(graphql`
		query {
			file(relativePath: { eq: "background/landingpage.jpg" }) {
				childImageSharp {
					fluid {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`)

	return (
		<div className="LandingPage">
			<div style={{ position: 'relative' }}>
				<Img
					fluid={backgroundImage.file.childImageSharp.fluid}
					style={{
						maxHeight: 400
					}}
					objectPosition="bottom center"
				/>

				<div
					style={{
						bottom: 0,
						height: 30,
						position: 'absolute',
						zIndex: 100,
						right: 0,
						left: 0
					}}
				>
					<Separator />
				</div>
			</div>
			<section>
				<H2>Indika, c'est avant tout...</H2>

				<div
					className="container"
					style={{
						display: 'flex',
						gridGap: 60,
						width: 1020
					}}
				>
					<Box>
						<img
							src="/images/icons/landingpage/icon_expertise.svg"
							height={75}
							width={75}
						/>
						<h3>
							Une vraie expertise,
							<br />à votre service
						</h3>
						<p>
							En tant qu’experts de la santé et de l’épargne, nous sommes à vos
							côtés pour vous conseiller, et vous proposer des solutions
							adaptées à VOS besoins.
						</p>
					</Box>
					<Box>
						<img
							src="/images/icons/landingpage/icon_meilleurs.svg"
							height={75}
							width={75}
						/>
						<h3>
							Vous apporter les
							<br />
							meilleures solutions
						</h3>
						<p>
							Nos nombreux partenariats nous permettent de vous proposer les
							meilleures solutions du marché, En toute indépendance.
						</p>
					</Box>
					<Box>
						<img
							src="/images/icons/landingpage/icon_independant.svg"
							height={75}
							width={75}
						/>
						<h3>Vous simplifier la vie</h3>
						<p>
							Tous vos documents et informations accessibles en 3 clics sur
							votre espace Vos documents annuels sont transmis directement à
							votre comptable.
						</p>
					</Box>
				</div>
			</section>
			<section>
				<H2>Avec le soutien de</H2>
			</section>
			<section>
				<H2>Nos partenaires</H2>
			</section>
			<section
				style={{
					backgroundColor: 'white'
				}}
			>
				<H2>Ils nous font confiance</H2>

				<div
					className="container"
					style={{
						display: 'flex',
						gridGap: 40,
						width: 659,
						marginTop: 20
					}}
				>
					<div className="bordered-box">
						Pète sa mère le service et le gars est charmant. Pète sa mère le
						service et le gars est charmant. Jacqueline
						<br /> <br />
						<strong>Jacqueline</strong>
					</div>
					<div className="bordered-box">
						Pète sa mère le service et le gars est charmant. Pète sa mère le
						service et le gars est charmant. Jacqueline
						<br /> <br />
						<strong>Jacqueline</strong>
					</div>
					<div className="bordered-box">
						Pète sa mère le service et le gars est charmant. Pète sa mère le
						service et le gars est charmant. Jacqueline
						<br /> <br />
						<strong>Jacqueline</strong>
					</div>
				</div>
			</section>
			<section className="why-us">
				<div className="container">
					<Box>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								height: '100%'
							}}
						>
							<div
								style={{
									height: 60,
									paddingRight: 15
								}}
							>
								<img
									src="/images/icons/landingpage/icon_etudes_gratuites.svg"
									height={60}
									width={60}
								/>
							</div>

							<div
								style={{
									textAlign: 'left'
								}}
							>
								<strong>Nos études sont gratuites !</strong>
								<br />
								Confiez nous votre projet et nous vous apporterons une réponse
								claire et personnalisée.
							</div>
						</div>
					</Box>
					<Box>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								height: '100%'
							}}
						>
							<div
								style={{
									height: 60,
									paddingRight: 15
								}}
							>
								<img
									src="/images/icons/landingpage/icon_meilleurs_solutions.svg"
									height={60}
									width={60}
								/>
							</div>

							<div
								style={{
									textAlign: 'left'
								}}
							>
								<strong>Les meilleures solutions du marché</strong>
								<br />
								Des contrats négociés pour vous auprès des meilleures compagnies
								d’assurance.
							</div>
						</div>
					</Box>
					<Box>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								height: '100%'
							}}
						>
							<div
								style={{
									height: 60,
									paddingRight: 15
								}}
							>
								<img
									src="/images/icons/landingpage/icon_interlocuteur_unique.svg"
									height={60}
									width={60}
								/>
							</div>

							<div
								style={{
									textAlign: 'left'
								}}
							>
								<strong>Un interlocuteur unique</strong> pour vous accompagner,
								vous conseiller et faire le point régulièrement sur votre
								situation.
							</div>
						</div>
					</Box>

					<Box>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								height: '100%'
							}}
						>
							<div
								style={{
									height: 60,
									paddingRight: 15
								}}
							>
								<img
									src="/images/icons/landingpage/icon_disponible.svg"
									height={60}
									width={60}
								/>
							</div>

							<div
								style={{
									textAlign: 'left'
								}}
							>
								<strong>Nous sommes disponibles.</strong>
								<br />
								Par mail, téléphone ou via le chat, pour vous assister et
								répondre rapidement à vos questions.
							</div>
						</div>
					</Box>
				</div>
			</section>
			<div className="cta-section">
				<div className="background-effect">
					<div className="separator-container">
						<Separator />
					</div>
				</div>

				<div
					className="container"
					style={{
						width: 1050
					}}
				>
					<H2 decorationColor="white">Quel est votre objectif ? </H2>
					<p>
						Expliquez nous votre projet,
						<br /> nous sommes là pour vous guider
					</p>

					<div className="objective-item-container">
						<ObjectiveItem title="Retraite" icon="retraite">
							Préparer ma retraite et réduire mon imposition
						</ObjectiveItem>
						<ObjectiveItem title="Prévoyance" icon="prevoyance">
							Maintenir mes revenus en cas d’arrêt et protéger mes proches
						</ObjectiveItem>
						<ObjectiveItem title="Mutuelle santé" icon="mutuelle">
							Couvrir ma santé et celle de ma famille.{' '}
						</ObjectiveItem>
						<ObjectiveItem title="épargne" icon="epargne">
							Épargner, valoriser et transmettre mon patrimoine{' '}
						</ObjectiveItem>
					</div>
				</div>
			</div>

			<LandingPageArticlesSection />

			<LandingPageContactSection />
		</div>
	)
}

const ObjectiveItem = ({ title, children, icon }) => {
	return (
		<div className="ObjectiveItem">
			<div className="icon-container">
				<img src={`/images/icons/landingpage/icon_${icon}.svg`} />
			</div>
			<div className="title">{title}</div>

			<div className="text">{children}</div>
		</div>
	)
}

export default LandingPage
