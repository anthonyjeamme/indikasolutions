import React, { useState, createContext, useContext, useEffect } from 'react'
import * as firebase from 'firebase'

import LoadingScreen from '../screen/LoadingScreen'

const SessionContext = createContext({
	user: null,
	userData: null,
	signIn: () => {},
	signOut: () => {}
})

export const useSession = () => useContext(SessionContext)

export const SessionContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [userData, setUserData] = useState(null)
	const [userClaims, setUserClaims] = useState(null)
	const [isLoading /*,setIsLoading*/] = useState(false)

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async user => {
			setUserClaims(user ? (await user.getIdTokenResult()).claims : null)
			setUser(user)
		})
	}, [])

	const signIn_EMAIL_PASSWORD = (email, password) => {
		// TODO

		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				console.log(user)
			})
	}

	const signIn_GOOGLE = () => {
		return firebase
			.auth()
			.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(({ user }) => {
				console.log(user)
				// setUser(user)
			})
			.catch(err => {
				console.log(err)
				setUser(null)
				setUserData(null)
				setUserClaims(null)
			})
	}

	const signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				localStorage.clear()
				setUser(null)
				setUserData(null)
				setUserClaims(null)
			})
	}

	return (
		<SessionContext.Provider
			value={{
				user,
				userData,
				userClaims,
				signIn_GOOGLE,
				signIn_EMAIL_PASSWORD,
				signOut
			}}
		>
			{isLoading ? <LoadingScreen /> : children}
		</SessionContext.Provider>
	)
}
