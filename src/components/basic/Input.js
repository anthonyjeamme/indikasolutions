import React from 'react'

export const Input = ({
	className = '',
	style = {},
	type = 'text',
	...props
}) => {
	return (
		<input
			type={type}
			className={`field input ${className}`}
			style={style}
			{...props}
		/>
	)
}
