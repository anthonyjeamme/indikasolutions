import React, { useState } from 'react'
import { FLEX_COLUMN, FLEX } from '../../style/structure'
import { Logo, LogoMini } from '../basic/Logo'
import { useLayout } from '.'
import { Link } from 'gatsby'
import { useModal } from '../modal/Modal'
import { useSession } from '../context/Session'
import { Button } from '../basic/Button'

const ItemLink = ({
	children,
	to,
	desktopOnly = false,
	onClick = () => {}
}) => (
	<Link
		onClick={onClick}
		className={`layout-header-item ${desktopOnly ? 'desktop-only' : ''}`}
		to={to}
	>
		<span>{children}</span>
	</Link>
)

const ItemA = ({ children, href, onClick = () => {} }) => (
	<a className="layout-header-item" href={href} onClick={onClick}>
		<span>{children}</span>
	</a>
)

const DefaultItems = ({ t }) => {
	const [mobileSidePanelIsOpen, setMobileSidePanelIsOpen] = useState(false)

	const toggleMobileSidePanelIsOpen = () => {
		setMobileSidePanelIsOpen(!mobileSidePanelIsOpen)
	}
	return (
		<>
			<div className="left">
				<Link to="/" className="layout-header-brand">
					<Logo color={t.theme === 'light-bg' ? 'light' : 'dark'} />
				</Link>
				<ItemLink desktopOnly={true} to="/articles">
					S'informer
				</ItemLink>
				<ItemLink desktopOnly={true} to="/qui-sommes-nous">
					Qui sommes-nous ?
				</ItemLink>
			</div>
			<div className="right desktop-only">
				<ItemA href="tel:0781934723">
					<i className="fas fa-phone" /> 07 81 93 47 23
				</ItemA>

				<ItemLink to="/espace-client">Mon espace</ItemLink>
			</div>

			<div className="layout-header-mobile">
				<div className="burger" onClick={toggleMobileSidePanelIsOpen}>
					<i className="fas fa-bars" />
				</div>

				<div
					className={`overlay ${mobileSidePanelIsOpen ? 'open' : ''}`}
					onClick={toggleMobileSidePanelIsOpen}
				/>

				<nav className={`side-menu ${mobileSidePanelIsOpen ? 'open' : ''}`}>
					<div className="close-button" onClick={toggleMobileSidePanelIsOpen}>
						<i className="fas fa-times" />
					</div>

					<div style={FLEX(1)}>
						<ItemLink onClick={toggleMobileSidePanelIsOpen} to="/articles">
							S'informer
						</ItemLink>
						<ItemLink
							onClick={toggleMobileSidePanelIsOpen}
							to="/qui-sommes-nous"
						>
							Qui sommes-nous ?
						</ItemLink>
						<ItemA onClick={toggleMobileSidePanelIsOpen} href="tel:0781934723">
							<i className="fas fa-phone" /> 07 81 93 47 23
						</ItemA>
					</div>
					<div className="side-menu-bottom">
						<Link onClick={toggleMobileSidePanelIsOpen} to="/espace-client">
							Mon espace
						</Link>
					</div>
				</nav>
			</div>
		</>
	)
}

const ClientSpaceItems = () => {
	const session = useSession()

	return (
		<>
			<div className="left" style={FLEX(1)}>
				<Link to="/" className="layout-header-brand">
					<LogoMini color="light" /> Mon espace
				</Link>
			</div>
			{session.user && (
				<div className="layout-header-item" onClick={session.signOut}>
					<span>
						<i className="fas fa-sign-out-alt" /> Se déconnecter
					</span>
				</div>
			)}
		</>
	)
}

export const Header = () => {
	const t = useLayout()

	return (
		<div className="layout-header">
			<div
				className={t.theme === 'client-space' ? '' : 'container'}
				style={{
					display: 'flex',
					flex: 1
				}}
			>
				{t.theme === 'client-space' ? (
					<ClientSpaceItems />
				) : (
					<DefaultItems t={t} />
				)}
			</div>
		</div>
	)
}
