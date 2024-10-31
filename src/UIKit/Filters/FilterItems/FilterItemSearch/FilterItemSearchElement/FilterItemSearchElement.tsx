import React from 'react';
import icons from '../../../../shared/icons';

interface FilterItemSearchElementProps {
	/** Значение элемента */
	name: string,
	/** Обработчик удаления элемента */
	deleteHandler: () => void
}

/** Обертка элемента фильтров со строкой поиска */
export default function FilterItemSearchElement({ name, deleteHandler }: FilterItemSearchElementProps) {
	return (
		<div className="search-element">
			<div className="search-element__name">{name}</div>
			<div className="search-element__close-button" onClick={() => deleteHandler()}>{icons.DeleteSearchItem}</div>
		</div>
	)
}