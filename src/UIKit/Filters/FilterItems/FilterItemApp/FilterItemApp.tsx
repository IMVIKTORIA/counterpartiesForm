import React from 'react';
import FilterItemWrapper from '../FilterItemWrapper/FilterItemWrapper';
import { FilterItemProps, FilterItemWrapperProps, AppFilter, ObjectItem } from '../../FiltersTypes';
import CustomInputAppItem from '../../../CustomInputAppItem/CustomInputAppItem';

interface FilterItemAppProps extends FilterItemProps<AppFilter>, FilterItemWrapperProps {
    href: string,
    saveStateHandler: (...args: any) => any
};

/** Обертка панели фильтров */
export default function FilterItemApp(props: FilterItemAppProps) {
    const { filterValue, setFilterValue, href, saveStateHandler } = props

    /** Удалить значение */
    const removeValue = () => {
        filterValue.reset();
        setFilterValue(filterValue);
    }

    return (
        <FilterItemWrapper {...props}>
            <CustomInputAppItem value={filterValue.value.value} setValue={() => { }} removeValueHandler={removeValue} href={href} saveStateHandler={saveStateHandler} />
        </FilterItemWrapper>
    )
}