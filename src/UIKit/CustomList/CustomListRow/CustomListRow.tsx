import React from 'react'
import CustomListRowColumn from '../CustomListRowColumn/CustomListRowColumn'
import { ItemData, ListColumnData, getDetailsLayoutAttributes } from '../CustomListTypes'

interface ListRowProps<ItemType = any> {
	/** Настройки строки (обязательно) */
	/** Параметры отображения колонки */
	columnsSettings: ListColumnData[]
	/** Данные строки */
	data: ItemType

	/** Настройки открытия детальной информации по строке (Необязательно) */
	/** Показать детальную информацию */
	isShowDetails?: boolean
	/** Обработчик нажатия на строку */
	setOpenRowIndex?: () => any
	/** Функция получения разметки детальной информации строки списка */
	getDetailsLayout?: ({ rowData, onClickRowHandler }: getDetailsLayoutAttributes) => any

	/** Строгие настройки отображения строки списка (Необязательно) */
	/** Открыта */
	isOpen?: boolean
	/** Кликабельна */
	isClickable?: boolean

	reloadData: () => void
}

/** Строка таблицы */
function CustomListRow<ItemType = any>(props: ListRowProps<ItemType>) {
	const { isShowDetails, columnsSettings, data, getDetailsLayout, setOpenRowIndex, isOpen, isClickable, reloadData } = props;

	/** Получение значения класса строки */
	const getRowClassname = (): string => {
		// Показана детальная информация
		if (getDetailsLayout && isShowDetails || isOpen) return "custom-list-row custom-list-row_open"
		// Скрыта детальная информация, можно развернуть
		if (getDetailsLayout || isClickable) return "custom-list-row custom-list-row_openable"
		// Нельзя развернуть детальную информацию
		return "custom-list-row"
	}

	return (
		<>
			{!isShowDetails &&
				<div className={getRowClassname()} onClick={setOpenRowIndex}>
					{columnsSettings.map(settings => {
						if (data == undefined) {
							return;
						}
						const columnData: ItemData<any> = data[settings.code];

						return (
							<CustomListRowColumn data={columnData} {...settings} />
						)
					})}
				</div>
			}
			{/* Заменять строку на разметку деталей строки списка */}
			{isShowDetails && getDetailsLayout && getDetailsLayout({ rowData: data, reloadData: reloadData, onClickRowHandler: setOpenRowIndex })}
		</>
	)
}

export default CustomListRow
