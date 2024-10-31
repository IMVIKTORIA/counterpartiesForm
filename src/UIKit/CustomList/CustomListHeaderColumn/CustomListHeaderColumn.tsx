import React from 'react'
import icons from '../../shared/icons'
import { ListColumnData, SortData } from '../CustomListTypes';

interface ListColumnProps extends ListColumnData {
	handleSortClick: any,
	sortData: SortData | undefined
}

/** Столбец шапки таблицы */
function CustomListHeaderColumn(props: ListColumnProps) {
	const { code, fr, isSortable, name, handleSortClick, sortData } = props;

	/** Переключение режима сортировки для колонки */
	const toggleSortColumn = () => {
		let data: SortData | undefined = sortData;

		if (data?.code != code) {
			data = new SortData({ code: code })
		} else if (data.isAscending) {
			data = new SortData({ code: code, isAscending: false })
		} else {
			data = undefined;
		}

		handleSortClick(data);
	}

	const isShowArrowUp = (): boolean => {
		return ((sortData?.code == code && sortData.isAscending) || sortData?.code != code);
	}

	const isShowArrowDown = (): boolean => {
		return ((sortData?.code == code && !sortData.isAscending) || sortData?.code != code);
	}

	const sortButton = (
		<div className="custom-list-header-column__button" onClick={toggleSortColumn}>
			<div className="custom-list-header-column__button_up">
				{isShowArrowUp() && icons.SortArrow}
			</div>
			<div className="custom-list-header-column__button_down">
				{isShowArrowDown() && icons.SortArrow}
			</div>
		</div>
	)

	return (
		<div className="custom-list-header-column" style={{ flex: fr }}>
			<div className="custom-list-header-column__name">
				{name}
			</div>
			{isSortable && sortButton}
		</div>
	)
}

export default CustomListHeaderColumn
