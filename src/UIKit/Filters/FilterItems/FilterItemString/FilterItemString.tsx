import React, { PropsWithChildren, useState } from 'react'
import CustomInput from '../../../CustomInput/CustomInput'
import FilterItemWrapper from '../FilterItemWrapper/FilterItemWrapper';
import { FilterItemProps, FilterItemWrapperProps, StringFilter } from '../../FiltersTypes';

interface FilterItemStringProps extends FilterItemProps<StringFilter>, FilterItemWrapperProps {
	/** Функция маски */
	maskFunction?: (value: string) => string
	/** Надпись при пустом значении */
	placeholder?: string
};

/** Обертка панели фильтров */
export default function FilterItemString(props: FilterItemStringProps) {
    const { filterValue, setFilterValue } = props
    const inputHandler = (value: string) => {
        console.log(value)
        const currentValue: StringFilter = filterValue;
        currentValue.value = value;
        setFilterValue(currentValue);
    }

    return (
        <FilterItemWrapper {...props}>
            <CustomInput maskFunction={props.maskFunction} placeholder={props.placeholder} value={filterValue.value} setValue={inputHandler}/>
        </FilterItemWrapper>
    )
}