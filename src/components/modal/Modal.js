import React, { useState } from 'react'

import { Input } from '../basic/Input'

import './index.scss'
import { Button } from '../basic/Button'

export const useModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleIsOpen = () => {
		setIsOpen(!isOpen)
	}

	return {
		isOpen,
		setIsOpen,
		toggleIsOpen
	}
}

export const Modal = ({
	isOpen,
	toggleIsOpen,
	children,
	contentStyle = {}
}) => {
	return isOpen ? (
		<div className="modal">
			<div className="overlay" onClick={toggleIsOpen} />
			<div className="modal-content box" style={contentStyle}>
				{children}
			</div>
		</div>
	) : null
}
