/** Интерфейс фильтров */
export interface IFilter {
	/** Сброс фильтра */
	reset(): void
	/** Код поля */
	fieldCode: string
	/** Название поля */
	fieldName: string
}

/** Операторы фильтров по строке */
export enum StringFilterOperator {
	/** Равно */
	eq = 'eq',
	/** Неравно */
	neq = 'neq',
	/** Содержит */
	like = 'like',
}

/** Фильтр по строке */
export class StringFilter implements IFilter {
	/** Значение */
	value: string
	/** Оператор (по умолчанию Содержит) */
	operator: StringFilterOperator
	fieldCode: string
	fieldName: string

	constructor(code: string, name: string, value?: string) {
		this.reset()
		this.fieldCode = code
		this.fieldName = name
		if (value) this.value = value
	}

	reset(): void {
		this.value = ''
		this.operator = StringFilterOperator.like
	}
}

/** Фильтр по элементу приложения */
export class AppFilter implements IFilter {
	/** Значение */
	value: ObjectItem
	fieldCode: string
	fieldName: string

	constructor(code: string, name: string, value?: ObjectItem) {
		this.reset()
		this.fieldCode = code
		this.fieldName = name
		if (value) this.value = value
	}

	reset(): void {
		this.value = new ObjectItem({})
	}
}

/** Значение элемента списка */
export class ObjectItem {
	/** Значение */
	value: string
	/** Код / Идентификатор */
	code: string

	constructor({ value, code }: { value?: string; code?: string }) {
		this.value = value ?? ''
		this.code = code ?? ''
	}
}

/** Фильтр по списку */
export class ListFilter implements IFilter {
	/** Значения */
	values: ObjectItem[]
	fieldCode: string
	fieldName: string

	constructor(code: string, name: string, values?: ObjectItem[]) {
		this.reset()
		this.fieldCode = code
		this.fieldName = name

		if (values?.length) this.values = values
	}

	reset(): void {
		this.values = []
	}
}

/** Фильтр по датам */
export class DateFilter implements IFilter {
	/** Дата от */
	valueFrom?: string
	/** Дата до */
	valueTo?: string
	fieldCode: string
	fieldName: string

	constructor(code: string, name: string, dateValues?: { valueFrom?: string; valueTo?: string }) {
		this.reset()
		this.fieldCode = code
		this.fieldName = name
		if (dateValues) {
			if (dateValues.valueFrom) this.valueFrom = dateValues.valueFrom
			if (dateValues.valueTo) this.valueTo = dateValues.valueTo
		}
	}

	reset(): void {
		this.valueFrom = undefined
		this.valueTo = undefined
	}
}

/** Базовый класс для фильтров */
export interface IFiltersData {
	/** Сброс всех фильтров */
	reset(): void
}

export interface FilterItemProps<FilterType> {
	/** Значение фильтра */
	filterValue: FilterType
	/** Изменение значения фильтра */
	setFilterValue: (value: FilterType, ...args: any) => any
}

/** Пропсы обертки фильтров */
export interface FilterItemWrapperProps {
	/** Название фильтра */
	title: string
	/** Изначальное значение открытости обертки */
	isOpenInit?: boolean
	/** Изменение изначального значения открытости обертки */
	setIsOpenInit?: (isOpen: boolean) => void
}
