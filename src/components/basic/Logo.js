import React from 'react'

const sizeToWidth = size => {
	switch (size) {
		case '':
			return 'auto'
		case 'small':
			return 144
		case 'normal':
			return 250
		case 'big':
			return 400
		default:
			console.error(`unknown ${size} size`)
	}
}

export const LogoMini = ({ color = 'light', style = {} }) => (
	<img
		src={`/images/logo/logo_${color}_bg_mini.svg`}
		alt="logo"
		className="logo"
		style={style}
	/>
)

export const Logo = ({
	color = 'light',
	// monochrome = false,
	size = '',
	style = {}
}) => (
	<img
		src={`/images/logo/logo_${color}_bg@4x.png`}
		alt="logo"
		className="logo"
		style={{
			width: sizeToWidth(size),
			...style
		}}
	/>
)

export const LogoSquare = ({
	color = 'light',
	// monochrome = false,
	size = '',
	style = {}
}) => (
	<img
		src={`/images/logo/logo_${color}_bg_square@4x.png`}
		alt="logo"
		className="logo"
		style={{
			width: sizeToWidth(size),
			...style
		}}
	/>
)
