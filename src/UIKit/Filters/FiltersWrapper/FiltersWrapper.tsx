import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import Button from '../../Button/Button'
import { ButtonType } from '../../Button/ButtonTypes'
import { selectRequestContext, SelectRequestFilters } from '../../../App/stores/SelectRequestContext'
import { AppFilter, DateFilter, IFilter, IFiltersData, ListFilter, StringFilter } from '../FiltersTypes'
import { checkHasFilters } from '../../shared/utils/utils'

interface FiltersWrapperProps {
	resetHandler?: () => void
	searchHandler?: () => Promise<void>
	isSearchButtonDisabled?: boolean
}

/** Обертка панели фильтров */
export default function FiltersWrapper({ searchHandler, resetHandler, children, isSearchButtonDisabled }: PropsWithChildren<FiltersWrapperProps>) {
  	const { data, setValue } = selectRequestContext.useContext();

	// Обработчик нажатия на enter
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Enter") searchHandlerWrapper()
			removeListener()
		};
		
		const removeListener = () => {
			document.removeEventListener("keydown", handleKeyDown)
		}

		document.addEventListener("keydown", handleKeyDown);
		
		return () => removeListener()
	}, [searchHandler]);
	
	// Показывать ошибку "Фильтр не выбран"?
	const [isShowEmptyFiltersError, setIsShowEmptyFiltersError] = useState<boolean>(false);

	// Обертка для функции поиска с проверкой выбранных фильтров
	const searchHandlerWrapper = () => {
		const hasFilters = checkHasFilters(data.filters);
		setIsShowEmptyFiltersError(!hasFilters);

		if(searchHandler && hasFilters) searchHandler()
	}

	return (
		<div className="filters-wrapper">
			<div className="filters-wrapper__header">фильтр</div>
			<div className="filters-wrapper__buttons">
				<Button title={'сбросить'} buttonType={ButtonType.outline} clickHandler={resetHandler} />
				<div className="filters-wrapper__buttons_search-button">
					<Button title={'поиск'} clickHandler={searchHandlerWrapper} disabled={isSearchButtonDisabled} />
					{isShowEmptyFiltersError && <div className="filters-wrapper__error-message">Фильтр не выбран</div>}
				</div>
			</div>
			<div className="filters-wrapper__list">
				{children}
			</div>
		</div>
	)
}