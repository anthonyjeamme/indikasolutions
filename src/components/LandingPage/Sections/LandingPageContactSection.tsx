import React from 'react'

import { H2 } from '../../basic/Heading'
import { Button } from '../../basic/Button'

import './LandingPageContactSection.scss'

const Input = ({ label = '' }) => {
	return (
		<div className="InputContainer">
			<label htmlFor="">{label}</label>
			<input className="Input" />
		</div>
	)
}

const Textarea = ({ label = '', className = '' }) => {
	return (
		<div className="TextareaContainer">
			<label htmlFor="">{label}</label>
			<textarea className={`Textarea ${className}`} />
		</div>
	)
}

const LandingPageContactSection = () => {
	const handleSubmit = e => {
		e.preventDefault()
	}

	return (
		<div className="LandingPageContactSection">
			<div className="box">
				<H2>Une question ? On vous répond !</H2>

				<form onSubmit={handleSubmit}>
					<div className="form-line">
						<div>
							<Input label="Nom" />
						</div>

						<div>
							<Input label="Adresse mail" />
						</div>
					</div>

					<div className="form-line">
						<Textarea label={'Message'} className="message" />
					</div>

					<div className="buttons">
						<Button theme="blue">Envoyer</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
export default LandingPageContactSection
