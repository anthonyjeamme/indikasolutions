import React, { createContext, useState, useContext } from 'react'

import { Header } from './Header'

import './index.scss'
import Footer from './Footer'

const LayoutContext = createContext(null)

export const useLayout = () => useContext(LayoutContext)

const Layout = ({ children }) => {
	const [params, setParams] = useState({
		theme: 'main',
		footer: true
	})

	const useMainTheme = () => {
		setParams({
			...params,
			theme: 'main',
			footer: true
		})
	}

	const useLightBgTheme = () => {
		setParams({
			...params,
			theme: 'light-bg',
			footer: true
		})
	}

	const useClientSpaceTheme = () => {
		setParams({
			...params,
			theme: 'client-space',
			footer: false
		})
	}

	return (
		<LayoutContext.Provider
			value={{
				...params,
				useMainTheme,
				useLightBgTheme,
				useClientSpaceTheme
			}}
		>
			<div className={`layout ${params.theme}`}>
				<Header />

				<div className="layout-body">{children}</div>

				{params.footer && <Footer />}
			</div>
		</LayoutContext.Provider>
	)
}
export default Layout
