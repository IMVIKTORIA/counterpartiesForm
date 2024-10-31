import React, { useEffect, useState } from 'react'

interface CustomSelectRowProps<DataType = string> {
	value: string,
	clickHandler: (value: string, data?: DataType) => void,
	data?: DataType,
}

/** Элемент выпадающего списка */
function CustomSelectRow<DataType = string>({ value, data, clickHandler }: CustomSelectRowProps<DataType>) {
	const onClickRow = (ev) => {
		ev.stopPropagation();
		clickHandler(value, data)
	}
	return (
		<div className="custom-select__row" onClick={onClickRow}>
			{value}
		</div>
	)
}

export default CustomSelectRow
