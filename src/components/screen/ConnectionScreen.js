import React, { useEffect, useState } from 'react'
import { useSession } from '../context/Session'
import { Label } from '../basic/Label'
import { Input } from '../basic/Input'
import { FLEX } from '../../style/structure'
import { Button } from '../basic/Button'
import { navigate } from 'gatsby'
import { useLayout } from '../layout'
import { useInput } from '../../utils/utils'

import '../../style/display.scss'

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
		<div
			style={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<div
				style={{
					width: 400,
					maxWidth: '95%',
					margin: 'auto',
					paddingTop: 40
				}}
			>
				<h2 className="text-center">Connexion à mon espace</h2>
				<div className="field-line">
					<Label style={{ width: 20 }}>
						<i className="far fa-user" />
					</Label>
					<Input style={FLEX(1)} {...emailInput.field} />
				</div>
				<div className="field-line">
					<Label style={{ width: 20 }}>
						<i className="fas fa-key" />
					</Label>
					<Input type="password" style={FLEX(1)} {...passwordInput.field} />
				</div>

				{formError && (
					<div className="alert danger text-center">{formError}</div>
				)}

				<Button
					className="small"
					onClick={emailPasswordSignIn}
					style={{ width: '100%' }}
				>
					Se connecter
				</Button>

				<hr />

				<div className="text-center">
					<Button
						className="google-connection"
						onClick={() => {
							session.signIn_GOOGLE().then(() => {
								navigate('/espace-client')
							})
						}}
					>
						<i className="fab fa-google" /> Connexion Google
					</Button>
				</div>

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
				</div>
			</div>
		</div>
	)
}
