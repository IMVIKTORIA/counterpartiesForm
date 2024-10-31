import React, { useEffect, useRef, useState } from 'react'
import CustomListColumn from './CustomListHeaderColumn/CustomListHeaderColumn'
import Loader from '../Loader/Loader'
import CustomListRow from './CustomListRow/CustomListRow'
import { FetchData, FetchItem, ListColumnData, SortData, getDetailsLayoutAttributes } from './CustomListTypes'

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
}

/** Список данных в виде таблицы */
function CustomList<SearchDataType = any, ItemType = any>(props: ListProps<SearchDataType, ItemType>) {
	const { height = "100%", listWidth, columnsSettings, getDataHandler, searchData, setSearchHandler, isScrollable = true, getDetailsLayout } = props;

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

	/** Установить обработчик нажатия на кнопку поиск */
	useEffect(() => {
		if (!setSearchHandler) return;

		setSearchHandler(() => { reloadData() });
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
				<div style={listWidth ? { width: `${listWidth - getScrollbarWidth(headerRef)}px` } : {}}>
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
							key={item.id}
							data={item.data}
							columnsSettings={columnsSettings}
							getDetailsLayout={getDetailsLayout}
							isShowDetails={getDetailsLayout && item.id === openRowIndex}
							setOpenRowIndex={toggleShowDetails}
							reloadData={reloadData}
						/>
					})}
					{isLoading && <Loader />}
				</div>
			</div>
		</div>
	)
}

export default CustomList
