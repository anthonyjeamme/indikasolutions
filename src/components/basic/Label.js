import React from 'react'

export const Label = ({ children, style = {} }) => {
	return (
		<div className="field label" style={style}>
			{children}
		</div>
	)
}
