/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import * as firebase from 'firebase'

import { SessionContextProvider } from './src/components/context/Session'

import './src/style/global.scss'
import Layout from './src/components/layout'

// Initialize Firebase
firebase.initializeApp({
	apiKey: process.env.GATSBY_FIREBASE_API_KEY,
	authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
	projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
	storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.GATSBY_FIREBASE_APP_ID,
	measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID
})

firebase.analytics()

export const wrapRootElement = ({ element }) => (
	<SessionContextProvider>{element}</SessionContextProvider>
)

export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>
