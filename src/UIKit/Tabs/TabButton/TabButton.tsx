import React, { useEffect, useReducer, useRef, useState } from 'react'

type TabButtonProps = {
	svg: any,
	title: string
	clickHandler?: any
}

function TabButton(props: TabButtonProps) {
	const { svg, clickHandler, title } = props;
	return (
		<button
			className='tab-button'
			onClick={clickHandler}
		>
			<div className='tab-button__icon'>
				{svg}
			</div>
			<div className='tab-button__title'>
				{title}
			</div>
		</button>
	)
}

export default TabButton
