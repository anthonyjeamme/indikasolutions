import React, { useEffect } from 'react'
import { Router, Link, Location } from '@reach/router'
import { useLayout } from '../../components/layout'
import { FULLSCREEN_COLUMN_CENTERED } from '../../style/structure'
import AdminDashboard from '../../components/clientPages/adminSpace/AdminDashboard'
import Appointments from '../../components/clientPages/adminSpace/Appointments'
import Clients from '../../components/clientPages/adminSpace/Clients'

import './AdminSpace.scss'
import { Button } from '../../components/basic/Button'
import { useSession } from '../../components/context/Session'
import { ConnectionPortal } from '../../components/screen/ConnectionScreen'

const AdminSpace = ({}) => {
	useEffect(useLayout().useClientSpaceTheme, [])

	const session = useSession()

	useEffect(() => {
		console.log(document.location.href)
	}, [])

	const leftPanelLinks = [
		{
			title: "Vu d'ensemble",
			to: '/espace-admin',
			icon: 'fas fa-home'
		},
		{
			title: 'Clients',
			to: '/espace-admin/clients',
			icon: 'fas fa-users'
		},
		{
			title: 'Rendez-vous',
			to: '/espace-admin/appointments',
			icon: 'fas fa-calendar'
		},
		{
			title: 'Mon équipe',
			to: '/espace-admin/team',
			icon: 'fas fa-sitemap'
		},
		{
			title: 'Mes chiffres',
			to: '/espace-admin/income',
			icon: 'fas fa-euro-sign'
		}
	]

	return (
		<div
			style={{
				...FULLSCREEN_COLUMN_CENTERED
			}}
			className="admin-space"
		>
			<Location>
				{({ location }) => (
					<nav style={{}} className="side-panel">
						<div style={{ flex: 1 }}>
							{leftPanelLinks.map(({ title, to, icon }) => (
								<Link
									className={`side-panel-item ${
										location.pathname === to ? 'selected' : ''
									}`}
									to={to}
								>
									<i className={`icon ${icon}`} /> {title}
								</Link>
							))}
						</div>

						<div>
							<Button
								className="info outline small"
								onClick={session.signOut}
								style={{ width: '100%' }}
							>
								Se déconnecter
							</Button>
						</div>
					</nav>
				)}
			</Location>

			<Router className="admin-space-body">
				<Clients path="/espace-admin/clients" />
				<Appointments path="/espace-admin/appointments" />
				<AdminDashboard path="/espace-admin/*" />
			</Router>
		</div>
	)
}
export default () => (
	<ConnectionPortal admin={true}>
		<AdminSpace />
	</ConnectionPortal>
)
