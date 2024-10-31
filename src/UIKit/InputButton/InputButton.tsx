import React, { useEffect, useReducer, useRef, useState } from 'react'

type InputButtonProps = {
	svg: any,
	clickHandler?: any
}

/** Кнопка внутри поля ввода */
function InputButton(props: InputButtonProps) {
	const { svg, clickHandler } = props;
	return (
		<button
			className='input-button'
			onClick={clickHandler}
		>
			{svg}
		</button>
	)
}

export default InputButton
