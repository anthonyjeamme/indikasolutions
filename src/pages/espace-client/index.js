import React, { useEffect } from 'react'
import { useLayout } from '../../components/layout'

import { useSession } from '../../components/context/Session'
import { FLEX_COLUMN, FLEX } from '../../style/structure'
import { Button } from '../../components/basic/Button'
import { Modal, useModal } from '../../components/modal/Modal'
import { ContractIcon } from '../../components/basic/icons/ContractIcon'

import './index.scss'
import { DocumentIcon } from '../../components/basic/icons/DocumentIcon'
import {
	withConnectionPortal,
	ConnectionPortal
} from '../../components/screen/ConnectionScreen'
import { navigate } from 'gatsby'

const ClientSpaceSection = ({ title, children, titleIcon = '' }) => (
	<div className="client-space-section">
		<h2>{title}</h2>

		<div className="box">{children}</div>

		<div className="after">
			<a>Tout voir</a>
		</div>
	</div>
)

const ClientSpaceDocument = ({ title }) => {
	const modal = useModal()

	return (
		<>
			<Modal
				{...modal}
				contentStyle={{
					height: '80vh',
					width: '90vw',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<iframe
					style={{
						height: '100%',
						width: '100%',
						border: 0,
						flex: 1
					}}
					src="https://firebasestorage.googleapis.com/v0/b/indika-solutions.appspot.com/o/general%2FFiche%20d%E2%80%99informations%20l%C3%A9gales.pdf?alt=media&token=9b0153a3-8d11-4f15-a1b6-72bea1dffdd5"
				/>

				<div
					style={{ marginTop: 15, justifyContent: 'flex-end' }}
					className="field-line"
				>
					<Button className="outline" onClick={modal.toggleIsOpen}>
						Fermer
					</Button>
					<Button className="outline">Télécharger</Button>
				</div>
			</Modal>
			<div
				className="client-space-icon-item big-icon-wrapper "
				onClick={modal.toggleIsOpen}
			>
				<DocumentIcon className="grey" />
				<header>{title}</header>
			</div>
		</>
	)
}

const ClientSpaceContract = ({ title }) => {
	const modal = useModal()

	return (
		<>
			<Modal
				{...modal}
				contentStyle={{
					height: '80vh',
					width: '90vw',
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				<iframe
					style={{
						height: '100%',
						width: '100%',
						border: 0,
						flex: 1
					}}
					src="https://firebasestorage.googleapis.com/v0/b/indika-solutions.appspot.com/o/general%2FFiche%20d%E2%80%99informations%20l%C3%A9gales.pdf?alt=media&token=9b0153a3-8d11-4f15-a1b6-72bea1dffdd5"
				/>

				<div
					style={{ marginTop: 15, justifyContent: 'flex-end' }}
					className="field-line"
				>
					<Button className="outline" onClick={modal.toggleIsOpen}>
						Fermer
					</Button>
					<Button className="outline">Télécharger</Button>
				</div>
			</Modal>
			<div
				className="client-space-icon-item big-icon-wrapper "
				onClick={modal.toggleIsOpen}
			>
				<ContractIcon className="grey" />
				{/* <img src="/images/icons/contract.svg" style={{ width: 100 }} /> */}
				<header>{title}</header>
			</div>
		</>
	)
}

const ClientSpaceTask = ({ title }) => (
	<li
		style={{
			...FLEX_COLUMN,
			alignItems: 'center'
		}}
	>
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div
				style={{
					height: 15,
					width: 15,
					display: 'inline-block',
					border: '1px solid #ccc',
					borderRadius: 5,
					marginRight: 15
				}}
			></div>
		</div>
		<div style={{ ...FLEX(1) }}>{title}</div>
		<div>
			<Button size="small" className="outline">
				Remplir
			</Button>
		</div>
	</li>
)

const getGreeting = () => {
	const now = new Date()

	if (now.getHours() < 12) {
		return 'Bonjour'
	} else if (now.getHours() < 18) {
		return 'Bonne après-midi'
	} else {
		return 'Bonsoir'
	}
}

const ClientSpace = ({}) => {
	const session = useSession()

	useEffect(useLayout().useClientSpaceTheme, [])

	useEffect(() => {
		if (session.userClaims.admin) {
			navigate('/espace-admin')
		}
	}, [])

	if (session.userClaims.admin) return null

	return (
		<div
			style={{
				marginTop: 80
			}}
			className="container"
		>
			<h1 style={{ marginBottom: 0 }}>
				{getGreeting()}, {session.user.displayName}
			</h1>
			<p
				className="subtitle color-grey"
				style={{ marginTop: 15, maxWidth: 500 }}
			>
				Vous trouverez toutes les informations concernant votre status,
				documents, contrats.
			</p>

			<div>
				<Button className="outline small grey" onClick={session.signOut}>
					<i className="fas fa-sign-out-alt" /> Se déconnecter
				</Button>
			</div>

			<hr />

			<ClientSpaceSection
				title={
					<span>
						Actions en attente{' '}
						<sup>
							<i className="fas fa-exclamation-circle color-danger" />
						</sup>
					</span>
				}
				titleIcon="fas fa-tasks"
			>
				<ul>
					<ClientSpaceTask title="Remplir mes informations" />
					<ClientSpaceTask title="Envoyer mon RIB" />
					<ClientSpaceTask title="Remplir mes informations" />
				</ul>
			</ClientSpaceSection>

			<ClientSpaceSection title="Mes documents" titleIcon="fas fa-file-alt">
				<div
					style={{
						...FLEX_COLUMN,
						flexWrap: 'wrap'
					}}
				>
					<ClientSpaceDocument title="GEC" />
					<ClientSpaceDocument title="Formalisation du devoir de conseil - mutuelle" />
					<ClientSpaceDocument title="Formalisation du devoir de conseil - placement" />
				</div>

				<small>2018</small>
				<hr style={{ marginTop: 5 }} />
				<div
					style={{
						...FLEX_COLUMN,
						flexWrap: 'wrap'
					}}
				>
					<ClientSpaceDocument title="GEC" />
				</div>

				<small>2017</small>
				<hr style={{ marginTop: 5 }} />
				<div
					style={{
						...FLEX_COLUMN,
						flexWrap: 'wrap'
					}}
				>
					<ClientSpaceDocument title="GEC" />
				</div>
			</ClientSpaceSection>
			<ClientSpaceSection
				title="Mes Contrats"
				titleIcon="fas fa-file-signature"
			>
				<div
					style={{
						...FLEX_COLUMN,
						flexWrap: 'wrap'
					}}
				>
					<ClientSpaceContract title="Assurance vie" />
					<ClientSpaceContract title="PEA" />
				</div>
				{/* <img
					src="/images/icons8-check-100.png"
					style={{ width: 75, opacity: 0.5 }}
				/>
				<img
					src="/images/icons8-purse-100.png"
					style={{ width: 75, opacity: 0.5 }}
				/> */}
			</ClientSpaceSection>

			<ClientSpaceSection title="Mon conseiller" titleIcon="fas fa-user">
				<div style={FLEX_COLUMN}>
					<div style={FLEX(1)}>
						<strong>Kevin CHAOUCH</strong>
					</div>
					<div>
						<Button className="small outline">Contacter</Button>
					</div>
				</div>
			</ClientSpaceSection>
		</div>
	)
}
export default () => (
	<ConnectionPortal>
		<ClientSpace />
	</ConnectionPortal>
)
