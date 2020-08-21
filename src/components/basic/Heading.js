import React from 'react'

import './Heading.scss'

export const H2 = ({ children, decorationColor = 'normal' }) => {
	return (
		<div className={`H2 decoration-color-${decorationColor}`}>
			<div>
				<h2>{children}</h2>
			</div>
		</div>
	)
}
