import React, { useEffect, useState } from 'react'
import { useSession } from '../context/Session'
import { Input } from '../basic/Input'
import { FLEX } from '../../style/structure'
import { Button } from '../basic/Button'
import { useLayout } from '../layout'
import { useInput } from '../../utils/utils'

import '../../style/display.scss'
import './ConnectionScreen.scss'
import { ArrowIcon } from '../basic/icons/Icons'

export const ConnectionPortal = ({ children, admin = false }) => {
	const session = useSession()

	if (session.user) {
		if (admin && !session.userClaims.admin) {
			return null
		}

		return children
	}

	return <ConnectionScreen session={session} />
}

export const ConnectionScreen = ({ session }) => {
	useEffect(useLayout().useClientSpaceTheme, [])

	const emailInput = useInput()
	const passwordInput = useInput()
	const [formError, setFormError] = useState(null)

	const emailPasswordSignIn = () => {
		session
			.signIn_EMAIL_PASSWORD(emailInput.value, passwordInput.value)
			.catch(err => {
				if (err.code === 'auth/invalid-email') {
					setFormError('Le mail saisie est invalide')
				} else {
					setFormError('Le mot de passe ou le mail sont incorrects')
				}
			})
	}

	return (
		<div className="connection-screen">
			<div className="left-panel"></div>
			<div className="signin-form">
				<h2>Bienvenue sur votre espace !</h2>
				<p className="subtitle">
					Retrouvez tous vos documents en quelques clics.
				</p>
				<div className="field-line">
					<Input
						style={FLEX(1)}
						{...emailInput.field}
						placeHolder="Adresse mail"
					/>
				</div>
				<div className="field-line">
					<Input
						type="password"
						style={FLEX(1)}
						{...passwordInput.field}
						placeHolder="Mot de passe"
					/>
				</div>

				<div className="forget-password">Mot de passe oublié</div>

				{formError && (
					<div className="alert danger text-center">{formError}</div>
				)}

				<Button
					className="small"
					onClick={emailPasswordSignIn}
					style={{ width: '100%' }}
				>
					Se connecter
					<ArrowIcon />
				</Button>

				<div className="not-client">Je n'ai pas de compte</div>

				{/* 
				<hr />

				<div
					className="text-center"
					style={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<span className="secured-tag">
						<div>
							<i className="fas fa-lock icon" />
						</div>
						<div className="right">
							<span className="line-top">Sécurisé</span>
							<span className="line-bottom">chiffrement SSL</span>
						</div>
					</span>
				</div> */}
			</div>
		</div>
	)
}
