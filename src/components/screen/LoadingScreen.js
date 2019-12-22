import React from 'react'
import { FULLSCREEN_CENTERED } from '../../style/structure'

const LoadingScreen = () => {
	return (
		<div style={FULLSCREEN_CENTERED}>
			<i className="fas fa-spin fa-spinner fa-2x" />
		</div>
	)
}
export default LoadingScreen
