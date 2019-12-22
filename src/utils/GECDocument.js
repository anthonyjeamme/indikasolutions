import React, { useState, useEffect, Fragment } from 'react'
import { capitalize, isBrowser } from './utils'

var uniqid = require('uniqid')
var emailValidation = require('email-validator')

export const idFromLabel = label =>
	label
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]/g, ' ')
		.trim()
		.split(' ')
		.map((e, i) => (i === 0 ? e : capitalize(e)))
		.join('')

const textFormat = (maxLength = null) => value => {
	if (maxLength && value.length > maxLength) throw ''
	return value
}

const numberFormat = (maxLength = null) => value => {
	value = `${value}`

	if (value.match(/[^0-9,\.]/) || (maxLength && value.length > maxLength))
		throw ''
	if (!/^[0-9]*([\.,][0-9]*)?$/.test(value)) throw ''

	return value.length === 0 ? '' : value
}

const phoneFormat = value => {
	if (value.match(/[^0-9]/) || value.length > 10) throw ''
	return value
}

const phoneValidation = value => {
	return value.length === 10
}

const birthDayValidation = value => {
	const [year] = value.split('-')
	const yearInt = parseInt(year, 10)

	return yearInt > 1800 && yearInt <= new Date().getFullYear()
}

const minMaxLengthValidation = (minLength, maxLength) => value =>
	value.length >= minLength && (maxLength ? value.length < maxLength : true)

const notNullValidation = value => {
	return typeof value === 'string' ? value.length > 0 : value != null
}

const zipCodeValidation = value => {
	return value.length === 5
}

const numberString = value => {
	if (value.match(/[^0-9]/) || value.length > 5) throw ''
	return value
}

const APEFormat = value => {
	if (value.length > 5) throw ''
	if (value.length < 5 && value.match(/[^0-9]/)) throw ''
	if (value.length === 5 && !/^[0-9]{4}[A-Za-z]$/.test(value)) throw ''

	return value.toUpperCase()
}

const APEValidation = isTNS => value => {
	if (!isTNS()) return true
	return /^[0-9]{4}[A-Z]$/.test(value)
}

const SIRENFormat = value => {
	if (value.length > 9) throw ''
	if (value.match(/[^0-9]/)) throw ''

	return value
}

const SIRENValidation = isTNS => value => {
	if (!isTNS()) return true

	return value.length === 9 && !value.match(/[^0-9]/)
}

/*
 * Save the field value
 *
 * Can be use in input like that :
 *
 *  <input {...instance.field} className={instance.className} />
 *
 * Can be use in input like that :
 *
 * <select {...instance.selectField} className={instance.className}>
 *     {instance.getOptions()}
 * </select>
 */
const Field = ({
	defaultValue = '',
	facultative = false,
	validation = null,
	options = null,
	validClassName = 'valid',
	facultativeClassName = 'facultative',
	format = textFormat(),
	isActive = () => true
} = {}) => {
	const [value, setValue] = useState(defaultValue)
	const [id] = useState(uniqid())

	const onChange = e => {
		try {
			setValue(format(e.target.value))
		} catch (e) {}
	}

	const field = {
		value,
		onChange
	}

	const selectField = {
		onChange
	}

	const isValid = () => {
		if (validation) return validation(value)
		return true
	}

	const getOptions = () => {
		if (options) {
			return (
				<>
					<option disabled value=""></option>
					{options.map(value => (
						<option key={value} value={idFromLabel(value)}>
							{value}
						</option>
					))}
				</>
			)
		}
		return null
	}

	const getRadios = () => {
		if (options) {
			return options.map((option, i) => (
				<Fragment key={i}>
					<label>
						<input
							checked={idFromLabel(option) === value}
							onChange={e => {
								setValue(idFromLabel(e.target.value))
								console.log(e.target.value)
							}}
							type="radio"
							style={{ marginRight: 10 }}
							name={id}
							value={idFromLabel(option)}
						/>
						<span>
							<small>{option}</small>
						</span>
					</label>
				</Fragment>
			))
		}
		return null
	}

	const className = `${isValid() && validClassName} ${facultative &&
		facultativeClassName}`

	return {
		value,
		setValue: value => setValue(format(value)),
		isValid,
		isActive,
		field,
		selectField,
		getOptions,
		getRadios,
		className,
		facultative
	}
}

const PhoneField = (config = {}) =>
	Field({
		format: phoneFormat,
		validation: phoneValidation,
		...config
	})

const TextField = (minLength, maxLength) => (config = {}) =>
	Field({
		format: textFormat(maxLength),
		validation: minMaxLengthValidation(minLength, maxLength),
		...config
	})

const ListField = ({
	validation = () => true,
	itemValidation = name => value => true
} = {}) => {
	const [data, setData] = useState([])

	// TODO the second function (with name arg) is useless. better to delete it
	const field = n => name => {
		if (n < 0 || n >= data.length) throw 'Get field out of range'

		const remove = () => {
			setData([...data.slice(0, n), ...data.slice(n + 1)])
		}

		return {
			remove,
			field: {
				value: data[n],
				onChange: e => {
					setData([...data.slice(0, n), e.target.value, ...data.slice(n + 1)])
				}
			},
			value: data[n],
			isValid
		}
	}

	const fields = data.map((_, i) => field(i))

	const add = () => {
		setData([...data, ''])
	}

	const isValid = () => {
		for (let i = 0; i < data.length; i++) {
			const item = data[i]

			for (let j = 0; j < Object.keys(item).length; j++) {
				const fieldName = Object.keys(item)[j]
				const field = item[fieldName]

				if (itemValidation[fieldName]) {
					if (!itemValidation[fieldName](field)) return false
				}
			}
		}

		return true
	}

	return {
		data,
		add,
		fields,
		isValid,
		setData
	}
}

const BooleanField = ({ defaultValue = null } = {}) => {
	const [value, setValue] = useState(defaultValue)

	const toggle = () => {
		setValue(!value)
	}

	const isValid = () => value !== null

	const isActive = () => true

	return {
		value,
		toggle,
		setValue,
		isValid,
		isActive
	}
}

const NumberField = () => {
	return Field({
		format: numberFormat(),
		defaultValue: 0
	})
}

// const ListField = (defaultValue = '', config = {}) => Field(defaultValue, {format: NumberField, ...config })

const familySituationValues = [
	'Célibataire',
	'Pacsé',
	'Marié',
	'Concubinage',
	'Divorcé',
	'Veuf'
]

const jobStatusValues = ['Salarié', 'TNS', 'Autre', 'Retraité']

const genderValues = ['Monsieur', 'Madame']

const fieldsToJSON = fieldList =>
	Object.keys(fieldList)
		.map(key => ({ key, value: fieldList[key].value }))
		.reduce((acc, val) => ({ ...acc, [val.key]: val.value }), {})

const fieldListToJSON = list => list.data

const GECDocument = (autoSave = true, localStorageKey = 'gec') => {
	useEffect(() => {
		if (isBrowser())
			localStorage.setItem(localStorageKey, JSON.stringify(toJSON()))
	})

	let isTNS = () => {
		if (!data) return true
		return data.client.jobStatus.value === 'tns'
	}

	let partnerIsTNS = () => {
		if (!data) return true
		return data.partner.jobStatus.value === 'tns'
	}

	const epargneFieldLine = () => ({
		monthly: NumberField(),
		total: NumberField(),
		totalPartner: NumberField()
	})

	const generateTableFields = array => {
		return array.reduce((acc, cur) => {
			acc[cur] = epargneFieldLine()
			return acc
		}, {})
	}

	const data = {
		client: {
			gender: Field({ options: genderValues, validation: notNullValidation }),
			firstname: TextField(2)(),
			lastname: TextField(2)(),
			birthDay: Field({ validation: birthDayValidation }),
			familySituation: Field({
				options: familySituationValues,
				validation: notNullValidation
			}),
			address: TextField(2)({ facultative: true }),
			zipCode: TextField(5)({
				validation: zipCodeValidation,
				format: numberString
			}),
			city: TextField(2)(),
			job: TextField(2)(),
			jobStatus: Field({
				options: jobStatusValues,
				validation: notNullValidation
			}),
			phoneNumber: PhoneField(),
			emailAddress: Field({ validation: emailValidation.validate }),
			APE: Field({
				format: APEFormat,
				validation: APEValidation(isTNS),
				isActive: isTNS
			}),
			SIREN: Field({
				format: SIRENFormat,
				validation: SIRENValidation(isTNS),
				isActive: isTNS
			}),
			done: BooleanField({ defaultValue: false })
		},
		partner: {
			gender: Field({ options: genderValues, validation: notNullValidation }),
			firstname: TextField(2)(),
			lastname: TextField(2)(),
			birthDay: Field({ validation: birthDayValidation }),
			job: TextField(2)(),
			jobStatus: Field({
				options: jobStatusValues,
				validation: notNullValidation
			}),
			APE: Field({
				format: APEFormat,
				validation: APEValidation(partnerIsTNS),
				isActive: partnerIsTNS
			}),
			SIREN: Field({
				format: SIRENFormat,
				validation: SIRENValidation(partnerIsTNS),
				isActive: partnerIsTNS
			}),
			done: BooleanField({ defaultValue: false })
		},
		children: {
			list: ListField({
				itemValidation: {
					birthDay: birthDayValidation
				}
			}),
			done: BooleanField({ defaultValue: false })
		},
		assurances: {
			complementaire: BooleanField(),
			gav: BooleanField(),
			obseque: BooleanField(),
			indemnitesJournaliere: BooleanField(),
			done: BooleanField({ defaultValue: false })
		},
		realEstate: {
			principale: Field(),
			secondaire: Field(),
			defisc: Field(),
			done: BooleanField({ defaultValue: false })
		},
		epargne: {
			liquidites: generateTableFields([
				'compteCourant',
				'livretA',
				'ldd',
				'cel',
				'pel',
				'autres'
			]),
			valeurMobiliere: generateTableFields([
				'pea',
				'compteTitres',
				'fipFcpi',
				'autres'
			]),
			perp: generateTableFields(['perp']),
			pro: generateTableFields(['1', '2', '3']),
			done: BooleanField({ defaultValue: false })
		},
		budget: {
			revenus: NumberField(),
			salaire: NumberField(),
			foncier: NumberField(),
			chargesFixes: NumberField(),
			creditImmobilier: NumberField(),
			creditImmobilierFoncier: NumberField(),
			autresCredits: NumberField(),
			impotsRevenus: NumberField(),
			impotsFonciers: NumberField(),
			taxeHabitation: NumberField(),
			chargesCourantes: NumberField(),
			caf: NumberField(),
			dividendes: NumberField(),
			done: BooleanField({ defaultValue: false })
		}
	}

	const CategoryToJSON = data => {
		const result = Object.keys(data).reduce((acc, val) => {
			const line = data[val]

			return {
				...acc,
				[val]: Object.keys(data[val]).reduce(
					(acc, val) => ({
						...acc,
						[val]: line[val].value
					}),
					{}
				)
			}
		}, {})
		return result
	}

	const hasPartner = () =>
		[
			idFromLabel('Pacsé'),
			idFromLabel('Marié'),
			idFromLabel('Concubinage')
		].includes(idFromLabel(data.client.familySituation.value))

	const toJSON = () => {
		return {
			client: fieldsToJSON(data.client),
			partner: fieldsToJSON(data.partner),
			children: {
				done: data.children.done.value,
				list: fieldListToJSON(data.children.list)
			},
			assurances: fieldsToJSON(data.assurances),
			realEstate: fieldsToJSON(data.realEstate),
			epargne: {
				liquidites: CategoryToJSON(data.epargne.liquidites),
				valeurMobiliere: CategoryToJSON(data.epargne.valeurMobiliere),
				perp: CategoryToJSON(data.epargne.perp),
				pro: CategoryToJSON(data.epargne.pro),
				done: data.epargne.done.value
			},
			budget: fieldsToJSON(data.budget)
		}
	}

	const fromJSON = json => {
		Object.keys(json.client).forEach(field => {
			if (data.client[field]) data.client[field].setValue(json.client[field])
		})

		if (json.partner)
			Object.keys(json.partner).forEach(field => {
				if (data.partner[field])
					data.partner[field].setValue(json.partner[field])
			})

		if (json.children) {
			data.children.done.setValue(json.children.done)
			data.children.list.setData(json.children.list)
		}

		if (json.assurances)
			Object.keys(json.assurances).forEach(field => {
				if (data.assurances[field])
					data.assurances[field].setValue(json.assurances[field])
			})

		if (json.realEstate)
			Object.keys(json.realEstate).forEach(field => {
				if (data.realEstate[field])
					data.realEstate[field].setValue(json.realEstate[field])
			})

		if (json.epargne)
			Object.keys(json.epargne).forEach(categoryName => {
				if (categoryName === 'done') return

				const jsonCategory = json.epargne[categoryName]
				const category = data.epargne[categoryName]

				Object.keys(jsonCategory).forEach(line => {
					category[line].monthly.setValue(`${jsonCategory[line].monthly}`)
					category[line].total.setValue(`${jsonCategory[line].total}`)
					category[line].totalPartner.setValue(
						`${jsonCategory[line].totalPartner}`
					)
				})
			})
		data.epargne.done.setValue(json.epargne.done)

		if (json.budget)
			Object.keys(json.budget).forEach(field => {
				if (data.budget[field]) data.budget[field].setValue(json.budget[field])
			})
	}

	const getClientProgress = () => {
		return getProgressOf(data.client)
	}

	const getPartnerProgress = () => {
		return getProgressOf(data.partner)
	}
	const getChildrenProgress = () => {
		return 1
	}
	const getAssurancesProgress = () => {
		return getProgressOf(data.assurances)
	}

	const getEpargneProgress = () => {
		return 1
		// return getProgressOf(data.epargne) TODO
	}

	const getPatrimoineProgress = () => {
		return getProgressOf(data.realEstate)
	}

	const getBudgetProgress = () => {
		return 1
		// return getProgressOf(data.budget) TODO
	}

	const getValidationProgress = () => {
		return [
			getClientProgress,
			getPartnerProgress,
			getChildrenProgress,
			getAssurancesProgress,
			getEpargneProgress,
			getPatrimoineProgress,
			getBudgetProgress
		].reduce((acc, cur) => acc + (cur() === 1 ? 1 : 0), 0)
	}

	const getProgressOf = data => {
		let validCount = 0
		let count = 0

		Object.keys(data).forEach(name => {
			const field = data[name]

			if (field.isActive && !field.isActive()) return

			count++
			if (field.isValid()) validCount++
		})

		return validCount / count
	}

	const getProgress = () => {
		let validCount = 0
		let count = 0

		Object.keys(data.client).forEach(name => {
			const field = data.client[name]

			if (!field.isActive()) return

			count++
			if (field.isValid()) validCount++
		})

		count++
		if (data.children.isValid()) validCount++

		if (hasPartner())
			Object.keys(data.partner).forEach(name => {
				const field = data.partner[name]

				if (!field.isActive()) return

				count++
				if (field.isValid()) validCount++
			})

		Object.keys(data.assurances).forEach(name => {
			const field = data.assurances[name]

			if (!field.isActive()) return

			count++
			if (field.isValid()) validCount++
		})

		Object.keys(data.budget).forEach(name => {
			const field = data.budget[name]

			if (!field.isActive()) return

			count++
			if (field.isValid()) validCount++
		})

		return Math.round((validCount * 100) / count)
	}

	const getEpargneTotal = (who = '*') => {
		let totalClient = 0
		let totalPartner = 0

		Object.keys(data.epargne).forEach(categoryName => {
			if (categoryName === 'done') return

			const category = data.epargne[categoryName]

			Object.keys(category).forEach(name => {
				const group = category[name]
				totalClient += parseInt(group.total.value, 10) || 0
				totalPartner += parseInt(group.totalPartner.value, 10) || 0
			})
		})

		return who === 'client'
			? totalClient
			: who === 'partner'
			? totalPartner
			: totalClient + totalPartner
	}

	const getRealEstateTotal = () => {
		return (
			(parseInt(data.realEstate.principale.value, 10) || 0) +
			(parseInt(data.realEstate.secondaire.value, 10) || 0) +
			(parseInt(data.realEstate.defisc.value, 10) || 0)
		)
	}

	const fromLocal = () => {
		let item
		if (isBrowser() && (item = localStorage.getItem('gec')) !== null)
			fromJSON(JSON.parse(item))
	}

	return {
		data,
		fromLocal,
		hasPartner,
		getProgress,
		toJSON,
		fromJSON,
		getRealEstateTotal,
		getEpargneTotal,
		getClientProgress,
		getPartnerProgress,
		getChildrenProgress,
		getAssurancesProgress,
		getEpargneProgress,
		getPatrimoineProgress,
		getBudgetProgress,
		getValidationProgress
	}
}

/*
 * Static functions
 */
GECDocument.getPatrimoineImmobilierTotal = gec =>
	(parseInt(gec.realEstate.principale, 10) || 0) +
	(parseInt(gec.realEstate.secondaire.value, 10) || 0) +
	(parseInt(gec.realEstate.defisc.value, 10) || 0)

GECDocument.getEpargneTotal = (gec, who = '*') => {
	let totalClient = 0
	let totalPartner = 0

	Object.keys(gec.epargne).forEach(categoryName => {
		if (categoryName === 'done') return

		const category = gec.epargne[categoryName]

		Object.keys(category).forEach(name => {
			const group = category[name]
			totalClient += parseInt(group.total, 10) || 0
			totalPartner += parseInt(group.totalPartner, 10) || 0
		})
	})

	return who === 'client'
		? totalClient
		: who === 'partner'
		? totalPartner
		: totalClient + totalPartner
}

GECDocument.getRevenusTotal = gec => {
	const { revenus, salaire, foncier, caf, dividendes } = gec.budget

	const totalRevenus =
		parseInt(revenus, 10) + parseInt(salaire, 10) + parseInt(foncier, 10)
	const revenusAutres = parseInt(caf, 10) + parseInt(dividendes, 10)

	return totalRevenus + revenusAutres
}

GECDocument.getCapaciteEpargne = gec => {
	const {
		revenus,
		salaire,
		foncier,
		chargesFixes,
		creditImmobilier,
		creditImmobilierFoncier,
		autresCredits,
		impotsRevenus,
		impotsFonciers,
		taxeHabitation,
		chargesCourantes,
		caf,
		dividendes
	} = gec.budget

	const totalRevenus =
		parseInt(revenus, 10) + parseInt(salaire, 10) + parseInt(foncier, 10)
	const totalDepenses = [
		chargesFixes,
		creditImmobilier,
		creditImmobilierFoncier,
		autresCredits,
		impotsRevenus,
		impotsFonciers,
		taxeHabitation,
		chargesCourantes
	].reduce((acc, cur) => acc + parseInt(cur, 10), 0)
	const revenusAutres = parseInt(caf, 10) + parseInt(dividendes, 10)

	return (totalRevenus + revenusAutres - totalDepenses) * 0.75
}

GECDocument.getTotalCredits = gec =>
	parseInt(gec.budget.creditImmobilier, 10) +
	parseInt(gec.budget.creditImmobilierFoncier, 10) +
	parseInt(gec.budget.autresCredits, 10)

// TODO remove
GECDocument.getLocal = (name = 'gec') => {
	let item
	const document = new GECDocument()
	if (isBrowser() && (item = localStorage.getItem(name)) !== null)
		document.fromJSON(JSON.parse(item))
	return document
}

export default GECDocument
