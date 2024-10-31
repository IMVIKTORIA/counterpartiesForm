import React, { useEffect, useRef, useState } from 'react'
import icons from '../shared/icons'
interface CustomInputCheckboxProps {
	title: string,
	checked: boolean,
	setValue: (value: boolean) => any
}

function CustomInputCheckbox({ title, checked = false, setValue }: CustomInputCheckboxProps) {

	const checkedIcon = icons.Checked;
	const uncheckedIcon = icons.Unchecked;

	/** Нажатие на чекбокс */
	const onClick = () => {
		setValue(!checked);
	}

	return (
		<div className="custom-checkbox" onClick={onClick}>
			<div className="custom-checkbox__icon">
				{
					checked
						? checkedIcon
						: uncheckedIcon
				}
			</div>
			<div className="custom-checkbox__label">
				{title}
			</div>
		</div>
	)
}

export default CustomInputCheckbox
