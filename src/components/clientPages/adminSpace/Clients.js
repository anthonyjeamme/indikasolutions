import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import * as firebase from 'firebase'
import GECDocument from '../../../utils/GECDocument'
import { validateEmail, useInput, isBrowser } from '../../../utils/utils'

import './ClientList.scss'
import { FLEX } from '../../../style/structure'
import { Input } from '../../basic/Input'

/*
var hummus = require('hummus'),
    PDFDigitalForm = require('./pdf-digital-form')

var pdfParser = hummus.createReader('files/gec.pdf');
var digitalForm = new PDFDigitalForm(pdfParser);

if (digitalForm.hasForm()) {
    console.log(digitalForm.fields);
    console.log(digitalForm.createSimpleKeyValue());
}
*/

const columnsList = [
	{
		title: 'Adresse mail',
		get: doc => doc.data.gec.client.emailAddress
	},
	{
		title: 'Nom complet',
		get: doc =>
			`${doc.data.gec.client.firstname} ${doc.data.gec.client.lastname}`
	},
	{
		title: 'Date de naissance',
		get: doc => doc.data.gec.client.birthDay
	},
	{
		title: 'Epargne totale',
		get: doc => {
			return GECDocument.getEpargneTotal(doc.data.gec)
		}
	},
	{
		title: 'Patrimoine immobilier',
		get: doc => {
			return GECDocument.getPatrimoineImmobilierTotal(doc.data.gec)
		}
	},
	{
		title: 'Revenus',
		get: doc => {
			return GECDocument.getRevenusTotal(doc.data.gec)
		}
	},
	{
		title: "Capacité d'épargne",
		get: doc => {
			return GECDocument.getCapaciteEpargne(doc.data.gec)
		}
	},
	{
		title: 'Total crédits / mois',
		get: doc => {
			return GECDocument.getTotalCredits(doc.data.gec)
		}
	}
]

const ColumnsEditionModal = ({ columns, setColumns, open, setOpen }) => {
	const selectRef = useRef(null)

	const up = (c, i) => {
		if (i === 0) return

		setColumns([
			...columns.slice(0, i - 1),
			c,
			columns[i - 1],
			...columns.slice(i + 1)
		])
	}

	const down = (c, i) => {
		if (i >= columns.length - 1) return

		setColumns([
			...columns.slice(0, i),
			columns[i + 1],
			c,
			...columns.slice(i + 2)
		])
	}

	const remove = c => {
		setColumns(columns.filter(e => e.title !== c.title))
	}

	const add = () => {
		let item = columnsList.filter(e => e.title === selectRef.current.value)

		if (item.length === 0) return
		item = item[0]

		setColumns([...columns, item])
	}

	return (
		<div className={`modal ${open && 'active'}`}>
			<div>
				<header>
					<span style={{ float: 'right' }}>
						<button
							className="invisible"
							onClick={() => {
								setOpen(false)
							}}
						>
							<i className="fas fa-times" />
						</button>
					</span>
					Editer les colonnes
				</header>
				<div className="background-white text-small">
					{columns.map((column, i) => (
						<div key={column.title}>
							<span style={{ marginRight: 10 }}>
								<i
									className="fas fa-caret-up"
									onClick={() => {
										up(column, i)
									}}
								/>
							</span>

							<span style={{ marginRight: 10 }}>
								<i
									className="fas fa-caret-down"
									onClick={() => {
										down(column, i)
									}}
								/>
							</span>

							<span style={{ float: 'right' }}>
								<i
									className="fas fa-times"
									onClick={() => {
										remove(column)
									}}
								/>
							</span>

							{column.title}
						</div>
					))}
					<hr />

					<select ref={selectRef}>
						{columnsList
							.filter(e => {
								if (columns.map(c => c.title).includes(e.title)) return false

								return true
							})
							.map(c => (
								<option key={c.title} value={c.title}>
									{c.title}
								</option>
							))}
					</select>

					<button className="success" onClick={add}>
						ajouter
					</button>
				</div>
			</div>
		</div>
	)
}

const NewClientModal = ({ open, onClose }) => {
	const [userCreated, setUserCreated] = useState(false)
	const [userDataExists, setUserDataExists] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const clientEMail = useInput('', { validation: validateEmail })
	const clientFirstname = useInput('', { validation: v => v.length > 2 })
	const clientLastname = useInput('', { validation: v => v.length > 2 })

	const createNewUser = () => {
		if (isLoading) return
		setIsLoading(true)

		const createUserByAdmin = firebase
			.functions()
			.httpsCallable('createUserByAdmin')
		createUserByAdmin({
			email: clientEMail.value,
			firstname: clientFirstname.value,
			lastname: clientLastname.value
		})
			.then(({ data }) => {
				setUserCreated(true)
				waitUserDataCreation(data.uid)
				setIsLoading(false)

				const actionCodeSettings = {
					// After password reset, the user will be give the ability to go back
					// to this page.
					url: 'https://indikasolutions.com/auth/login/', // TODO update this to indikasolutions.com
					handleCodeInApp: false
				}

				firebase
					.auth()
					.sendPasswordResetEmail(clientEMail.value, actionCodeSettings)
			})
			.catch(e => {
				// TODO
				console.log(e)
				setIsLoading(false)
			})
	}

	const formIsValid =
		clientEMail.valid && clientFirstname.valid && clientLastname.valid

	const checkUserDataExistence = uid =>
		new Promise((resolve, reject) => {
			const request = firebase
				.firestore()
				.collection('clients')
				.doc(uid)
			request
				.get()
				.then(result => {
					resolve(result.exists === true)
				})
				.catch(e => {
					resolve(false)
				})
		})

	const waitUserDataCreation = async uid => {
		const exists = await checkUserDataExistence(uid)

		if (exists) setUserDataExists(true)
		else {
			setTimeout(() => {
				waitUserDataCreation(uid)
			}, 2000)
		}
	}

	return (
		<div className={`modal ${open ? 'active' : ''}`}>
			<div>
				<header className="text-right">
					<button onClick={onClose} className="invisible">
						<i className="fas fa-times" />
					</button>
				</header>
				<div className="text-center">
					{userCreated ? (
						<div>
							{userDataExists ? (
								<div>
									<p className="text-small">Le compte a bien été créé</p>
									<button
										className="info"
										onClick={() => {
											onClose(true)
										}}
									>
										Fermer
									</button>
								</div>
							) : (
								<div>
									<p className="color-success text-small">
										Création du compte en cours
									</p>
									<button className="info" disabled={true}>
										<i className="fas fa-spin fa-spinner" />
									</button>
								</div>
							)}
						</div>
					) : (
						<form
							onSubmit={e => {
								e.preventDefault()
							}}
						>
							<p className="text-small color-grey-4">
								Une invitation lui sera envoyée par mail. Le client pourra ainsi
								accéder à son espace client et modifier sa GEC.
								<br />
								Vous pourrez également modifier ses données via l'espace
								d'administration.
							</p>
							<div className="margin-bottom-0-5">
								<input
									className={`fullwidth ${clientLastname.valid && 'success'}`}
									{...clientLastname.field}
									placeholder="Nom de famille"
								/>
							</div>
							<div className="margin-bottom-0-5">
								<input
									className={`fullwidth ${clientFirstname.valid && 'success'}`}
									{...clientFirstname.field}
									placeholder="Prénom"
								/>
							</div>

							<div className="margin-bottom-0-5">
								<input
									className={`fullwidth ${clientEMail.valid && 'success'}`}
									{...clientEMail.field}
									placeholder="Adresse mail"
								/>
							</div>
							<button
								onClick={createNewUser}
								className="info fullwidth"
								disabled={!formIsValid}
							>
								Envoyer une invitation par mail
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}

const ClientLine = ({ data, onClick }) => (
	<tr key={data.clientID} onClick={onClick} style={{ height: '10%' }}>
		{data.list.map(column => (
			<td key={column.title}>{column.value}</td>
		))}
	</tr>
)

const Header = ({ columns, setSortBy, sortBy }) => (
	<tr className="tableHeader">
		{columns.map(({ title }) => (
			<th
				className={`modifiable-th clickable-th ${sortBy &&
					sortBy.name === title &&
					'active'}`}
				key={title}
				onClick={() => {
					setSortBy(title)
				}}
			>
				<span className="text">
					{title}{' '}
					<span style={{ position: 'absolute', marginLeft: 10 }}>
						{sortBy &&
							sortBy.name === title &&
							(sortBy.order === 1 ? (
								<i className="fas fa-chevron-up" />
							) : (
								<i className="fas fa-chevron-down" />
							))}
					</span>
				</span>
			</th>
		))}
	</tr>
)
const getColumns = () => {
	let columnsTitles = ['Adresse mail', 'Nom complet']

	if (isBrowser() && localStorage.getItem('admin-clients-columns')) {
		try {
			columnsTitles = JSON.parse(localStorage.getItem('admin-clients-columns'))
		} catch (e) {
			// TODO
			console.log(e)
		}
	}

	return columnsTitles.map(
		title => columnsList.filter(e => e.title === title)[0]
	)
}

const setCachedClientList = list => {
	localStorage.setItem(
		'admin-space-cached-client-list',
		JSON.stringify({
			date: Date.now(),
			list
		})
	)
}

const getCachedClientList = () => {
	if (isBrowser()) {
		const cachedList = localStorage.getItem('admin-space-cached-client-list')

		if (cachedList) {
			return JSON.parse(cachedList).list
		}
		return []
	}
}

const ClientList = () => {
	const [list, setList] = useState(getCachedClientList())
	const [newClientModalOpen, setNewClientModalOpen] = useState(false)
	const [columnsEditionOpen, setColumnsEditionOpen] = useState(false)
	const [columns, setColumns] = useState(getColumns())
	const [currentPagination, setCurrentPagination] = useState(0)
	const [sortBy, setSortBy] = useState(null)
	const [newClientModalKey, setNewClientModalKey] = useState(0)
	const searchInput = useInput('')
	const [rightPanelIsOpen, setRightPanelIsOpen] = useState(false)

	const toggleRightPanelIsOpen = () => {
		setRightPanelIsOpen(!rightPanelIsOpen)
	}

	const openRightPanel = data => () => {
		// TODO here add data
		setRightPanelIsOpen(true)
	}

	const paginationItems = 10

	const loadData = () => {
		firebase
			.firestore()
			.collection('/clients')
			.get()
			.then(e => {
				const loadedList = e.docs.map(e => ({
					data: e.data(),
					id: e.id
				}))

				setCachedClientList(loadedList)

				setList(loadedList)
			})
	}

	useEffect(loadData, () => {})

	const previousPagination = () => {
		if (currentPagination === 0) return

		setCurrentPagination(currentPagination - 1)
	}

	const nextPagination = () => {
		if ((currentPagination + 1) * paginationItems > list.length) return

		setCurrentPagination(currentPagination + 1)
	}

	const sortClients = (a, b) => {
		if (!sortBy) return 0

		const { name, order } = sortBy

		const searchA = a.list.filter(e => e.title === name)
		const searchB = b.list.filter(e => e.title === name)

		if (searchA.length === 0 || searchB === 0) return 0

		const A = searchA[0].value
		const B = searchB[0].value

		return A > B ? (order ? 1 : -1) : A < B ? (order ? -1 : 1) : 0
	}

	const changeSortBy = name => {
		setSortBy({
			name,
			order: sortBy && sortBy.name === name ? 1 - sortBy.order : 0
		})
	}

	const updateColumns = value => {
		localStorage.setItem(
			'admin-clients-columns',
			JSON.stringify(value.map(e => e.title))
		)
		setColumns(value)
	}

	const currentList = list
		.filter(client =>
			client.data.gec.client.lastname
				.toLowerCase()
				.includes(searchInput.value.toLowerCase())
		)
		.map(client => {
			const list = columns.map(({ get, title }, i) => ({
				value: get(client),
				title
			}))

			return {
				clientID: client.id,
				list
			}
		})
		.sort(sortClients)
		.slice(
			currentPagination * paginationItems,
			(currentPagination + 1) * paginationItems
		)
		.map(data => (
			<ClientLine
				key={data.clientID}
				data={data}
				onClick={openRightPanel(data)}
			/>
		))

	return (
		<>
			<div className="client-list-searchbar">
				<Input />
			</div>
			<div
				style={{
					...FLEX(1),
					overflowY: 'auto',
					padding: '0 15px',
					boxSizing: 'border-box'
				}}
			>
				<div
					className={`overlay ${rightPanelIsOpen ? 'open' : ''}`}
					onClick={toggleRightPanelIsOpen}
				/>
				<div className={`right-panel ${rightPanelIsOpen ? 'open' : ''}`}>
					ici
				</div>

				{/* <NewClientModal
				key={newClientModalKey}
				open={newClientModalOpen}
				onClose={reload => {
					if (reload) {
						loadData()
					}
					setNewClientModalKey(newClientModalKey + 1)
					setNewClientModalOpen(false)
				}}
			/>
			<ColumnsEditionModal
				columns={columns}
				setColumns={updateColumns}
				open={columnsEditionOpen}
				setOpen={setColumnsEditionOpen}
			/> */}

				{/* <div className="columns padding-0-5 background-white container">
				<div className="column">
					<div>
						<button
							onClick={() => {
								setColumnsEditionOpen(true)
							}}
						>
							<i className="fas fa-columns" /> Editer les colonnes
						</button>
					</div>
					<div className="with-icon with-icon-left margin-top-0-5">
						<i className="fas fa-search icon left" />
						<input
							type="text"
							{...searchInput.field}
							placeholder="Chercher un nom"
						/>
					</div>
				</div>
				<div className="column text-right">
					<button
						className="info"
						onClick={() => {
							setNewClientModalOpen(true)
						}}
					>
						<i className="fas fa-plus" /> Ajouter un client
					</button>
				</div>
			</div> */}

				{/* <div className="pagination center margin-bottom-1">
					<div
						className={`item ${currentPagination === 0 && 'disabled'}`}
						onClick={previousPagination}
					>
						<i className="fas fa-chevron-left" />
					</div>
					<div className="item">{currentPagination + 1}</div>
					<div
						className={`item ${(currentPagination + 1) * paginationItems >
							list.length && 'disabled'}`}
						onClick={nextPagination}
					>
						<i className="fas fa-chevron-right" />
					</div>
				</div> */}

				<table className="client-list">
					<thead>
						<Header
							columns={columns}
							setColumns={setColumns}
							sortBy={sortBy}
							setSortBy={changeSortBy}
						/>
					</thead>
					<tbody>
						{currentList}
						{currentList.length < paginationItems &&
							[...new Array(paginationItems - currentList.length)].map(() => (
								<tr className="empty" style={{ height: '10%' }} />
							))}
					</tbody>
				</table>
			</div>

			<div className="pagination admin-panel-bottom-bar">
				<div
					className={`pagination-button ${currentPagination === 0 &&
						'disabled'}`}
					onClick={previousPagination}
				>
					<i className="fas fa-chevron-left" />
				</div>
				<div className="pagination-current">{currentPagination + 1}</div>
				<div
					className={`pagination-button ${(currentPagination + 1) *
						paginationItems >
						list.length && 'disabled'}`}
					onClick={nextPagination}
				>
					<i className="fas fa-chevron-right" />
				</div>
			</div>
		</>
	)
}
export default ClientList
