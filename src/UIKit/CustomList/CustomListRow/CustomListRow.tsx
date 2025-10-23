import React from 'react'
import CustomListRowColumn from '../CustomListRowColumn/CustomListRowColumn'
import { ItemData, ListColumnData, getDetailsLayoutAttributes } from '../CustomListTypes'
import CustomListSelector from '../CustomListSelector/CustomListSelector'

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

	listRef?: React.RefObject<HTMLDivElement>

	/** Возможность выбора строки */
	isSelectable?: boolean
	/** Множественный выбор строк */
	isMultipleSelect?: boolean

	/** Изменить выбор строки */
	toggleChecked: () => void;
	/** Селектор активен */
	isChecked: boolean;
}

/** Строка таблицы */
function CustomListRow<ItemType = any>(props: ListRowProps<ItemType>) {
	const { isShowDetails, columnsSettings, data, getDetailsLayout, setOpenRowIndex, isOpen, isClickable, reloadData, listRef, isSelectable, isMultipleSelect, toggleChecked, isChecked } = props;

	/** Получение значения класса строки */
	const getRowClassname = (): string => {
		// Показана детальная информация
		if (getDetailsLayout && isShowDetails || isOpen) return "custom-list-row custom-list-row_open"
		// Скрыта детальная информация, можно развернуть
		if (getDetailsLayout || isClickable) return "custom-list-row custom-list-row_openable"
		// Нельзя развернуть детальную информацию
		return "custom-list-row"
	}

	const rowStyles: React.CSSProperties = {};
	if (!isSelectable) rowStyles.paddingLeft = `20px`;

	return (
		<>
			{!isShowDetails &&
				<div className={getRowClassname()} onClick={setOpenRowIndex} style={rowStyles}>
					{/* Селектор */}
					{isSelectable && <CustomListSelector onClickSelector={toggleChecked} isMultiple={isMultipleSelect} isChecked={isChecked} />}
					{/* Колонки с данными */}
					{columnsSettings.map(settings => {
						if (data == undefined) {
							return;
						}
						const columnData: ItemData<any> = (data as any)[settings.code];
						return (
							<CustomListRowColumn listRef={listRef} data={columnData} {...settings} />
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
