import React from 'react'
import { redirectSPA } from '../shared/utils/utils'
import CustomInput from '../CustomInput/CustomInput'
import InputButton from '../InputButton/InputButton'
import icons from '../shared/icons'
import { CustomInputProps } from '../shared/types/types'

interface CustomInputAppItemProps extends CustomInputProps {
	/** Ссылка на страницу поиска элемента */
	href: string,
	/** Значение поля */
	value: string,
	/** Сохранение текущих данных формы в localStorage */
	saveStateHandler: (...args: any) => any
	/** Идентификатор элемента приложения */
	code?: string,
	/** Сброс значения поля */
	removeValueHandler?: (...args: any) => any
}

/** Поле выбора элемента приложения */
function CustomInputAppItem(props: CustomInputAppItemProps) {
	const { href, value = "", saveStateHandler, removeValueHandler = undefined, isInvalid } = props

	const searchButtonSvg = icons.Search;
	const removeButtonSvg = icons.Cross;

	const onClickSearchButton = (ev) => {
		ev.stopPropagation();
		if (!href) return
		// save state to localStorage
		saveStateHandler();
		// redirect
		redirectSPA(href);
	}

	const onClickRemoveButton = (ev) => {
		ev.stopPropagation();
		if (removeValueHandler) return removeValueHandler()
	}

	const searchButton = <InputButton svg={searchButtonSvg} clickHandler={onClickSearchButton} />
	const removeButton = <InputButton svg={removeButtonSvg} clickHandler={onClickRemoveButton} />

	const button =
		value
			? removeButton
			: searchButton

	return (
		<CustomInput cursor='pointer' {...props} buttons={button} customClassname={"custom-input__wrapper_link"} isInvalid={isInvalid} readOnly />
	)
}

export default CustomInputAppItem
