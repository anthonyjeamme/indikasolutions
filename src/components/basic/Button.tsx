import React from 'react'

import './Button.scss'

type ButtonProps = {
	theme: 'blue' | 'green'
}

export const Button = ({
	children,
	onClick = () => {},
	className = '',
	size = '',
	style = {},
	theme = ''
}: ButtonProps) => {
	return (
		<button
			className={`Button field button ${className} ${size} theme-${theme}`}
			style={style}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
