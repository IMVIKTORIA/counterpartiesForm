import React, { PropsWithChildren, useEffect, useRef } from 'react'
import Button from '../../Button/Button'
import { ButtonType } from '../../Button/ButtonTypes'

interface FiltersWrapperProps {
	resetHandler?: () => void
	searchHandler?: () => Promise<void>
	isSearchButtonDisabled?: boolean
}

/** Обертка панели фильтров */
export default function FiltersWrapper({ searchHandler, resetHandler, children, isSearchButtonDisabled }: PropsWithChildren<FiltersWrapperProps>) {
	// Обработчик нажатия на enter
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter" && searchHandler) searchHandler()
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [searchHandler]);

	return (
		<div className="filters-wrapper">
			<div className="filters-wrapper__header">фильтр</div>
			<div className="filters-wrapper__buttons">
				<Button title={"сбросить"} buttonType={ButtonType.outline} clickHandler={resetHandler} />
				<Button title={"поиск"} clickHandler={searchHandler} disabled={isSearchButtonDisabled} />
			</div>
			<div className="filters-wrapper__list">
				{children}
			</div>
		</div>
	)
}