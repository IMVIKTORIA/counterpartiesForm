import React, { useState } from 'react'

interface SliderPanelProps {
	title: string
	isVisible: boolean
	setIsVisible: (value: boolean) => void
}
/**Панель */
function SliderPanel({ title, isVisible, setIsVisible }: SliderPanelProps) {
	const toggleVisible = () => {
		setIsVisible(!isVisible)
	}

	return (
		<div className="medpult-slider-panel">
			<div className="medpult-slider-panel__switch">
				<div className="medpult-slider-panel__switch__text">{title}</div>
				<label className="medpult-slider-panel__switch__check">
					<input type="checkbox" checked={isVisible} onChange={toggleVisible} />
					<span className="medpult-slider medpult-round"></span>
				</label>
			</div>
		</div>
	)
}

export default SliderPanel
