import React, { useDeferredValue, useEffect, useRef, useState } from 'react';
import CustomInput from '../CustomInput/CustomInput';
import CustomSelectList from '../CustomSelect/CustomSelectList/CustomSelectList';
import CustomSelectRow from '../CustomSelect/CustomSelectRow/CustomSelectRow';
import InputButton from '../InputButton/InputButton';
import icons from '../shared/icons';
import { CustomInputProps, FetchInputData } from '../shared/types/types';
import { ObjectItem } from '../Filters/FiltersTypes';
import useDebounce from '../shared/utils/hooks';

interface CustomInputSearchProps<DataType = string> extends CustomInputProps {
	/** Измение состояния */
	setValue: (value: string, data?: DataType) => any
	/** Получение данных выпадающего списка */
	getDataHandler: (page: number, query?: string) => Promise<FetchInputData>,
	/** Дополнительные данные (напр. идентификатор) */
	data?: DataType
	/** Флажок режима просмотра */
	isViewMode?: boolean,
	/** Обработчик выбора элемента списка */
	optionClickHandler?: ({ value, data, closeCallback }: { value: string, data?: DataType, closeCallback: () => void }) => void
}

/** Выпадающий список с поиском */
function CustomInputSearch<DataType>(props: CustomInputSearchProps<DataType>) {
	const { value, setValue, optionClickHandler, getDataHandler, ...restProps } = props;

	// Страница
	const [page, setPage] = useState<number>(0);
	// Параметр остановки подгрузки элементов
	const [hasMore, setHasMore] = useState<boolean>(true);
	// Флажок открытости списка
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// Флажок загрузки
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// Ширина списка
	const [listWidth, setListWidth] = useState<number>(0);
	// Значения списка
	const [values, setValues] = useState<ObjectItem[]>([]);
	// Ссылка на обертку поля
	const rootRef = useRef<HTMLDivElement>(null);
	// Ссылка на поле
	const wrapperRef = useRef<HTMLDivElement>(null);
	// Значение поискового запроса
	const [query, setQuery] = useState<string>("");
	// Значение поискового запроса с debounce
	const deferredQuery = useDebounce(query, 500);

	/** Загрузка данных списка */
	const loadData = async (query?: string, values: ObjectItem[] = [], page: number = 0, hasMore: boolean = true) => {
		if (isLoading) return;
		if (!hasMore) return;

		// Показать лоадер
		setIsLoading(true)

		// Получение данных
		const fetchData = await getDataHandler(page, query);
		setHasMore(fetchData.hasMore)

		// Запись данных
		setValues([...values, ...fetchData.items])
		setPage(page + 1);

		// Скрыть лоадер
		setIsLoading(false)
	}

	/** Перезагрузка данных списка */
	const reloadData = (query?: string) => {
		setValues([]);

		loadData(query)
	}

	// debounce
	useEffect(() => {
		// Загрузить элементы по введенной строке
		reloadData(query);
	}, [deferredQuery])


	/** Обработчик ввода в поле поиска */
	const inputHandler = (ev) => {
		setQuery(ev.target.value)

		// Открыть список
		setIsOpen(true)
	}

	/** Обработчик нажатия на поле ввода */
	const clickHandler = (ev) => {
		// Открыть список
		setIsOpen(true)

		// Загрузить данные
		reloadData()
	}

	/** Обработчик закрытия списка */
	const closeHandler = () => {
		// Закрыть список
		setIsOpen(false)

		// Стереть текущее значение поискового запроса
		setQuery("")
	}

	/** Обработчик нажатия на вариант списка */
	const handleOptionClick = (value: string, data?: DataType) => {
		// Функция обратного вызова закрытия списка
		const closeCallback = () => setIsOpen(false);
		// Если в пропсах есть обработчик - вернуть его
		if (optionClickHandler) return optionClickHandler({ value, data, closeCallback })

		// Установить значение
		setValue(value, data)
		setQuery("")

		// Скрыть список
		closeCallback()
	}

	/** Вычисление размера выпадающего списка */
	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	}, [isOpen])

	/** Обработчик скролла по вертикали */
	const scrollCallback = () => {
		loadData(query, values, page, hasMore)
	}

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				{...restProps}
				value={isOpen ? query : value}
				setValue={v => setQuery(v)}
				onInput={inputHandler}
				clickHandler={clickHandler}
				wrapperRef={wrapperRef}
				cursor={props.isViewMode ? 'text' : 'pointer'}
				isOpen={isOpen}
				buttons={[<InputButton svg={icons.Triangle} clickHandler={clickHandler} />]}
			/>
			{isOpen &&
				<CustomSelectList
					rootRef={rootRef}
					isOpen={isOpen}
					closeHandler={closeHandler}
					isLoading={isLoading}
					listWidth={listWidth}
					scrollCallback={scrollCallback}
				>
					{values.map(item =>
						<CustomSelectRow
							value={item.value}
							clickHandler={() => handleOptionClick(item.value, item.code as any)}
						/>
					)}
				</CustomSelectList>
			}
		</div>
	)
}

export default CustomInputSearch
