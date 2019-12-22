import React from 'react'

export const Button = ({
	children,
	onClick = () => {},
	className = '',
	size = '',
	style = {}
}) => {
	return (
		<button
			className={`field button ${className} ${size}`}
			style={style}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
