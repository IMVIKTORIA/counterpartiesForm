import React, { useEffect, useState } from 'react';
import FilterItemWrapper from '../FilterItemWrapper/FilterItemWrapper';
import { FilterItemProps, ObjectItem, ListFilter, FilterItemWrapperProps } from '../../FiltersTypes';
import CustomInputSearch from '../../../CustomInputSearch/CustomInputSearch';
import FilterItemSearchElement from './FilterItemSearchElement/FilterItemSearchElement';
import { FetchInputData } from '../../../shared/types/types';

interface FilterItemSearchProps extends FilterItemProps<ListFilter>, FilterItemWrapperProps {
	/** Получение данных выпадающего списка */
	getDataHandler: (page: number, query?: string) => Promise<FetchInputData>,
}

/** Обертка элемента фильтров со строкой поиска */
export default function FilterItemSearch(props: FilterItemSearchProps) {
	const { filterValue, setFilterValue, getDataHandler } = props

	/** Добавление значения в фильтр */
	const addValue = (value: string, data?: string) => {
		const values = filterValue.values;
		if (Boolean(values.find(item => item.code === data))) return;

		values.push({ value: value, code: data ?? "" });
		setFilterValue(filterValue)
	}

	/** Счетчик выбранных значений */
	// Количество элементов
	const [selectedItemsCount, setSelectedItemsCount] = useState<number>(filterValue.values.length);
	// Изменение счетчика выбранных элементов
	React.useLayoutEffect(() => {
		setSelectedItemsCount(filterValue.values.length)
	}, [filterValue.values.length])
	// Надпись о количестве выбранных элементов
	const selectedItemsLabel = `Выбрано: ${selectedItemsCount}`

	/** Обработчик удаления элемента */
	const deleteHandler = (code: string) => {
		console.log(filterValue.values);
		filterValue.values = filterValue.values.filter(item => item.code !== code);
		setFilterValue(filterValue)
	}

	/** Получение данных без дубликатов */
	const getDataFiltered = async (page: number, query?: string): Promise<FetchInputData> => {
		const data = await getDataHandler(page, query);
		data.items = data.items.filter(value => !Boolean(filterValue.values.find(item => item.code === value.code)))

		return data;
	}

	return (
		<FilterItemWrapper {...props}>
			<CustomInputSearch data={''} setValue={addValue} getDataHandler={getDataFiltered} isViewMode={false} value={selectedItemsLabel} />
			<div className="filter-item-search-variants">
				{filterValue.values.map(item => <FilterItemSearchElement name={item.value} deleteHandler={() => deleteHandler(item.code)} />)}
			</div>
		</FilterItemWrapper>
	)
}