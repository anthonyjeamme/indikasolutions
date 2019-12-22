import React, { Fragment, useState } from 'react'

/*
 * Add space between each 2 numbers
 */
export const formatPhoneNumber = tel =>
	tel
		.split(/([0-9][0-9])/g)
		.filter(a => a !== '')
		.join(' ')
/*
 * Replace \n by <br/>
 */
export const handleLineReturn = string =>
	string.split('\n').map((item, key) => {
		return (
			<Fragment key={key}>
				{item}
				<br />
			</Fragment>
		)
	})

export const validateEmail = email => {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

export const isBrowser = () => typeof window !== 'undefined'

export const useInput = (defaultValue = null, config = {}) => {
	const [value, setValue] = useState(
		config.localStorage
			? localStorage.getItem(config.localStorage)
				? localStorage.getItem(config.localStorage)
				: defaultValue
			: config.sessionStorage
			? sessionStorage.getItem(config.sessionStorage)
				? sessionStorage.getItem(config.sessionStorage)
				: defaultValue
			: defaultValue
	)

	if (config.validation && typeof config.validation !== 'function') {
		console.error(`InputHooks validation function should be a function`)
		config.validation = null
	}

	if (config.inputPatch && typeof config.inputPatch !== 'function') {
		console.error('[inputHooks] inputPatch should be a function')
		config.inputPatch = null
	}

	const [valid, setValid] = useState(
		config.validation && typeof config.validation === 'function'
			? config.validation(defaultValue)
			: true
	)

	const onChange = e => {
		let value = e.target.value

		if (config.inputPatch) {
			value = config.inputPatch(value)
		}

		if (config.validation) {
			setValid(config.validation(value))
		}

		if (config.localStorage) {
			localStorage.setItem(config.localStorage, value)
		}
		if (config.sessionStorage) {
			sessionStorage.setItem(config.sessionStorage, value)
		}

		setValue(value)
	}

	return {
		field: {
			value,
			onChange
		},
		value,
		valid
	}
}
