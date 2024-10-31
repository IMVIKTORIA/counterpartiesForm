import React, { useState } from 'react';
import FilterItemWrapper from '../FilterItemWrapper/FilterItemWrapper';
import { FilterItemProps, ObjectItem, ListFilter, FilterItemWrapperProps } from '../../FiltersTypes';
import CustomInputCheckbox from '../../../CustomInputCheckbox/CustomInputCheckbox';
import Loader from '../../../Loader/Loader';

interface FilterItemCategoryProps extends FilterItemProps<ListFilter>, FilterItemWrapperProps {
	/** Список вариантов */
	variants: ObjectItem[]
}

/** Обертка элемента фильтров для строчного поиска */
export default function FilterItemCategory(props: FilterItemCategoryProps) {
	const { title, filterValue, setFilterValue, variants } = props;

	/** Разметка чекбоксов */
	const [checkboxes, setCheckboxes] = useState<React.JSX.Element[]>([]);

	/** Получение чекбоксов по текущим фильтрам и вариантам */
	const getCheckboxes = () => variants.map(variant => {
		const checked = isVariantChecked(variant)

		return <CustomInputCheckbox title={variant.value} checked={checked} setValue={toggleChecked(variant.code)} />
	})

	/** Отрисовка чекбоксов */
	React.useLayoutEffect(() => {
		setCheckboxes(getCheckboxes());
	}, [filterValue.values.length, variants])

	/** Проверка является ли вариант отмеченным */
	const isVariantChecked = (variant: ObjectItem): boolean => {
		return Boolean(filterValue.values.find(value => value.code == variant.code))
	}

	/** Проверка является ли вариант отмеченным */
	const toggleChecked = (code: string) => {
		return (value: boolean) => {
			const currentValues = filterValue;
			if (!value) {
				currentValues.values = currentValues.values.filter(value => value.code != code);
			} else {
				currentValues.values.push(new ObjectItem({ code: code }))
			}

			setFilterValue(currentValues)
		}
	}

	return (
		<FilterItemWrapper {...props}>
			<div className="filter-item-variants">
				{checkboxes.length
					? checkboxes
					: <Loader />
				}
			</div>
		</FilterItemWrapper>
	)
}