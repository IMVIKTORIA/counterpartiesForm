import React, { useEffect, useRef, useState } from 'react'
import CustomListColumn from './CustomListHeaderColumn/CustomListHeaderColumn'
import Loader from '../Loader/Loader'
import CustomListRow from './CustomListRow/CustomListRow'
import { FetchData, FetchItem, ListColumnData, SortData, getDetailsLayoutAttributes } from './CustomListTypes'
import CustomListSelector from './CustomListSelector/CustomListSelector'

type ListProps<SearchDataType = any, ItemType = any> = {
	/** Основные настройки */
	/** Настройки отображения колонок */
	columnsSettings: ListColumnData[]
	/** Получение данных */
	getDataHandler: (page: number, sortData?: SortData, searchData?: SearchDataType) => Promise<FetchData<ItemType>>
	/** Есть прокрутка? */
	isScrollable?: boolean
	/** Высота */
	height?: string;
	/** Ширина списка в пикселях */
	listWidth?: number;

	/** Настройки поиска */
	/** Данные поиска */
	searchData?: SearchDataType
	/** Установка обработчика нажатия на поиск */
	setSearchHandler?: (callback: () => void) => void

	/** Получение формы детальной информации по вкладке */
	getDetailsLayout?: ({ rowData, onClickRowHandler }: getDetailsLayoutAttributes) => any

	/** Возможность выбора строки */
	isSelectable?: boolean
	/** Множественный выбор строк */
	isMultipleSelect?: boolean
	/** Присвоить выбранные строки */
	setSelectedItems?: (ids: string[]) => void
}

/** Список данных в виде таблицы */
function CustomList<SearchDataType = any, ItemType = any>(props: ListProps<SearchDataType, ItemType>) {
	const { height = "100%", listWidth, columnsSettings, getDataHandler, searchData, setSearchHandler, isScrollable = true, getDetailsLayout, isMultipleSelect, isSelectable, setSelectedItems } = props;
	useEffect(() => { console.log(listWidth) }, [listWidth])
	// Страница
	const [page, setPage] = useState<number>(0);
	// Показать лоадер
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// Параметр остановки подгрузки элементов
	const [hasMore, setHasMore] = useState<boolean>(true);
	// Данные сортировки
	const [sortData, setSortData] = useState<SortData>();
	// Элементы списка
	const [items, setItems] = useState<FetchItem<ItemType>[]>([]);
	// Индекс раскрытой строки
	const [openRowIndex, setOpenRowIndex] = useState<string>();
	// Ссылка на тело списка
	const bodyRef = useRef<HTMLDivElement>(null);
	// Ссылка на шапку списка
	const headerRef = useRef<HTMLDivElement>(null);

	/** Перезагрузка данных */
	const reloadData = () => {
		setIsLoading(false);
		setItems([])

		loadData();
	}

	/** Обработка скролла по горизонтали */
	useEffect(() => {
		// Обработка скролла
		const handleScroll = () => {
			if (!bodyRef.current) return;
			if (!headerRef.current) return;

			// Синхронизация скролла шапки и тела
			headerRef.current.scrollLeft = bodyRef.current.scrollLeft;
		}

		bodyRef.current?.addEventListener("scroll", handleScroll)

		return () => bodyRef.current?.removeEventListener("scroll", handleScroll)
	}, [])

	/** Загрузка данных списка */
	const loadData = async (items: any[] = [], page: number = 0, hasMore: boolean = true) => {
		if (isLoading) return;
		if (!hasMore) return;

		setIsLoading(true);

		const fetchData = await getDataHandler(page, sortData, searchData);
		setHasMore(fetchData.hasMore)

		setItems([...items, ...fetchData.items])
		setPage(page + 1);
		setIsLoading(false);
	}

	/** Обработчик скролла по вертикали */
	const onScroll = () => {
		const body = bodyRef.current!;
		const height = body.scrollHeight - body.offsetHeight;
		const scrollPosition = body.scrollTop;

		if ((height - scrollPosition) / height < 0.05 && !isLoading) {
			loadData(items, page, hasMore)
		}
	}

	const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(true);
	/** Установить обработчик нажатия на кнопку поиск */
	useEffect(() => {
		if (!setSearchHandler) return;

		setSearchHandler(() => {
			setIsSearchPerformed(true);
			reloadData()
		});
	}, [searchData, sortData])

	/** Обновление оглавления при изменении сортировки */
	useEffect(() => {
		reloadData();
	}, [sortData])

	/** Нажатие на сортировку */
	const handleSortClick = (sortDataNew: SortData | undefined) => {
		setSortData(sortDataNew);
	}

	/** Получение ширины скроллбара */
	const getScrollbarWidth = (ref: React.RefObject<HTMLDivElement>) => {
		const element = ref.current;
		if (!element) return 0;

		return element.offsetWidth - element.clientWidth;
	}

	/** Идентификаторы выбранных строк */
	const [checkedRowsIds, setCheckedRowsIds] = useState<string[]>([]);
	/** Передача выбранных элементов наружу */
	useEffect(() => {
		if (setSelectedItems) setSelectedItems(checkedRowsIds);
	}, [checkedRowsIds])

	/** Добавление/удаление выбранной строки */
	const toggleCheckedRow = (id: string) => {
		const findId = checkedRowsIds.find(checkedId => checkedId === id);

		// Удаление
		if (findId) {
			setCheckedRowsIds(checkedRowsIds.filter(checkedId => checkedId != id));
			return
		}

		// Добавление
		if (isMultipleSelect) {
			setCheckedRowsIds([...checkedRowsIds, id]);
		} else {
			setCheckedRowsIds([id]);
		}
	}

	/** Стили шапки */
	const headerStyles: React.CSSProperties = {};
	if (listWidth) headerStyles.width = `${listWidth - getScrollbarWidth(headerRef)}px`;
	if (!isSelectable) headerStyles.paddingLeft = `20px`;

	const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

	const toggleAllRows = () => {
		if (!setSelectedItems) return;
		if (isAllSelected) {
			setCheckedRowsIds([]);
			setSelectedItems([]);
		} else {
			const allIds = items.map((item) => item.id);
			setCheckedRowsIds(allIds);
			setSelectedItems(allIds);
		}
		setIsAllSelected(!isAllSelected);
	};

	return (
		<div className='custom-list'>
			<div
				className={
					isScrollable
						? "custom-list__header custom-list__header_scrollable"
						: "custom-list__header"
				}
				ref={headerRef}
			>
				<div style={headerStyles}>
					{/* TODO: Выбор всех */}
					{isSelectable && (
						<div
							style={{
								position: "sticky",
								left: "0",
								visibility: (isMultipleSelect && isSearchPerformed) ? "visible" : "hidden",
								zIndex: "1000",
							}}
						>
							<CustomListSelector
								onClickSelector={toggleAllRows}
								isChecked={isAllSelected}
								isMultiple={true}
								style={{ background: "#f9f9fa" }}
							/>
						</div>
					)}
					{columnsSettings.map(columnSettings =>
						<CustomListColumn
							sortData={sortData}
							handleSortClick={handleSortClick}
							{...columnSettings}
						/>
					)}
				</div>
			</div>
			<div
				className={
					isScrollable
						? "custom-list__body_scrollable"
						: "custom-list__body"
				}
				style={{ height: height }}
				ref={bodyRef}
				onScroll={onScroll}
			>
				<div className='custom-list__body-wrapper' style={listWidth ? { width: `${listWidth - getScrollbarWidth(bodyRef)}px` } : {}}>
					{items.map(item => {
						/** Обработчик нажатия на строку */
						const toggleShowDetails = () => {
							if (item.id === undefined) return;

							if (item.id === openRowIndex) {
								setOpenRowIndex(undefined)
								return
							}

							setOpenRowIndex(item.id)
						}

						return <CustomListRow<ItemType>
							{...props}
							key={item.id}
							data={item.data}
							isShowDetails={getDetailsLayout && item.id === openRowIndex}
							setOpenRowIndex={toggleShowDetails}
							reloadData={reloadData}
							toggleChecked={() => toggleCheckedRow(item.id)}
							isChecked={Boolean(checkedRowsIds.find(checkedId => checkedId === item.id))}
							listRef={bodyRef}
						/>
					})}
					{isLoading && <Loader />}
				</div>
			</div>
		</div>
	)
}

export default CustomList
