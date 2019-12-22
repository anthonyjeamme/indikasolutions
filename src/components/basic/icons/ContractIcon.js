import React from 'react'

import './index.scss'

export const ContractIcon = ({ className = '' }) => {
	return (
		<svg
			id="Layer_1"
			data-name="Layer 1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 75 75"
			className={`big-icon ${className}`}
		>
			<rect
				x="8"
				y="13.88"
				width="59"
				height="46.25"
				rx="9.5"
				ry="9.5"
				className="background"
			/>
			<path
				className="fill"
				d="M57.5,14.38a9,9,0,0,1,9,9V50.63a9,9,0,0,1-9,9h-40a9,9,0,0,1-9-9V23.38a9,9,0,0,1,9-9h40m0-1h-40a10,10,0,0,0-10,10V50.63a10,10,0,0,0,10,10h40a10,10,0,0,0,10-10V23.38a10,10,0,0,0-10-10Z"
			/>

			{/*  */}
			<g
				style={{
					transform: 'translate(56px, 24px)'
				}}
			>
				<g>
					<g
						style={{
							transform: 'translate(-56px, -23.4px)'
						}}
					>
						<polyline
							className="stroke"
							points="54.19 27.9 54.19 36.6 57.75 33.75 61.5 36.75 61.5 27.75"
						/>
						<path
							className="fill"
							d="M57.75,18.75a5.13,5.13,0,1,1-5.12,5.13,5.13,5.13,0,0,1,5.13-5.12m0-.5a5.63,5.63,0,1,0,5.63,5.63,5.63,5.63,0,0,0-5.62-5.62Z"
						/>
					</g>
				</g>
			</g>

			<line className="stroke-0-5" x1="16.5" y1="34.75" x2="21.75" y2="34.75" />
			<line className="stroke-0-5" x1="16.5" y1="29.13" x2="27" y2="29.13" />
			<line className="stroke-0-5" x1="36.75" y1="40.38" x2="46.5" y2="40.38" />
			<line className="stroke-0-5" x1="39" y1="34.75" x2="46.5" y2="34.75" />
			<line className="stroke-0-5" x1="36.75" y1="46" x2="46.5" y2="46" />
			<line
				className="stroke-0-5"
				x1="24.75"
				y1="34.75"
				x2="36.38"
				y2="34.75"
			/>
			<line className="stroke-0-5" x1="16.5" y1="40.38" x2="29.25" y2="40.38" />
			<line
				className="stroke-0-5"
				x1="32.25"
				y1="40.38"
				x2="34.13"
				y2="40.38"
			/>
			<line className="stroke-0-5" x1="16.5" y1="46" x2="24" y2="46" />
			<line className="stroke-0-5" x1="27" y1="46" x2="34.13" y2="46" />
			<path
				className="stroke"
				d="M62.63,43.13v8.29a4.43,4.43,0,0,1-4.5,4.33H16.88a4.43,4.43,0,0,1-4.5-4.33V22.58a4.43,4.43,0,0,1,4.5-4.33H46.5"
			/>
		</svg>
	)
}
