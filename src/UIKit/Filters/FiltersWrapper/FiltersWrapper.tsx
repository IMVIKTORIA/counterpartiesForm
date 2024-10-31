import React, { PropsWithChildren } from 'react'
import Button from '../../Button/Button'
import { ButtonType } from '../../Button/ButtonTypes'

interface FiltersWrapperProps {
	resetHandler?: () => void
	searchHandler?: () => Promise<void>
	isSearchButtonDisabled?: boolean
}

/** Обертка панели фильтров */
export default function FiltersWrapper({ searchHandler, resetHandler, children, isSearchButtonDisabled }: PropsWithChildren<FiltersWrapperProps>) {

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