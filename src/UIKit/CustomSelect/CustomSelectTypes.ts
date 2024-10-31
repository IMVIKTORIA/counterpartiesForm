import { CustomInputProps } from '../shared/types/types'

/** Вариант выпадающего списка */
export interface CustomSelectOption {
	/** Значение */
	value: string
	/** Код/Идентификатор */
	code: string
}

export interface CustomSelectProps extends CustomInputProps {
	/** Измение состояния */
	setValue: (value: string, code: string) => any
	/** Получение списка значений */
	getDataHandler: () => Promise<CustomSelectOption[]>
	/** Флажок режима просмотра */
	isViewMode?: boolean
	/** Флажок валидации */
	isInvalid?: boolean
}
