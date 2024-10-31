import React from 'react';
import FilterItemWrapper from '../FilterItemWrapper/FilterItemWrapper';
import { FilterItemProps, DateFilter, FilterItemWrapperProps } from '../../FiltersTypes';
import CustomInputDate from '../../../CustomInputDate/CustomInputDate';
import { InputDateType } from '../../../CustomInputDate/CustomInputDateTypes';
import masks from '../../../shared/utils/masks';

interface FilterItemDatesProps extends FilterItemProps<DateFilter>, FilterItemWrapperProps { }

/** Обертка элемента фильтров для строчного поиска */
export default function FilterItemDates(props: FilterItemDatesProps) {
	const { filterValue, setFilterValue } = props;

	/** Установить дату после */
	const setFromDate = (dateStr?: string) => {
		filterValue.valueFrom = dateStr;
		setFilterValue(filterValue);
	}

	/** Установить дату до */
	const setToDate = (dateStr?: string) => {
		filterValue.valueTo = dateStr;
		setFilterValue(filterValue);
	}

	return (
		<FilterItemWrapper {...props}>
			<div className="filter-item-variants">
				<CustomInputDate type={InputDateType.date} value={masks.applyDateMask(filterValue.valueFrom ?? "")} setValue={setFromDate} />
				<CustomInputDate type={InputDateType.date} value={masks.applyDateMask(filterValue.valueTo ?? "")} setValue={setToDate} />
			</div>
		</FilterItemWrapper>
	)
}