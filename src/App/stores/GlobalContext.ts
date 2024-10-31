import React, { Reducer } from 'react'

/** Action для reducer */
interface ReducerAction {
	/** Тип операции */
	type: ActionType
	/** Передаваемое значение */
	payload: any
}

/** Типы действий */
enum ActionType {
	/** Изменить часть данных */
	PATCH = 'PATCH',
}

/** Изменение значений глобального состояния */
const reducer = <T>(state: T, action: ReducerAction): T => {
	switch (action.type) {
		case ActionType.PATCH: {
			const payload = action.payload as { key: string; value: any }

			return {
				...state,
				[payload.key]: payload.value,
			}
		}

		default:
			return state
	}
}

/** Хук для работы с глобальным состоянием */
const useGlobalState = <T>(initialState: T): [T, (key: string, value: any) => void] => {
	const [state, dispatch] = React.useReducer<Reducer<T, ReducerAction>>(reducer<T>, initialState)

	/** Установка значения поля глобального состояния */
	const setValue = React.useCallback((key: string, value: any) => {
		dispatch({ type: ActionType.PATCH, payload: { key: key, value: value } })
	}, [])

	return [state, setValue]
}

/** Подключение глобального контеста */
const useGlobalContext = <DataType>(context: React.Context<IGlobalContext<DataType> | null>) => {
	const data = React.useContext(context)

	if (!data) {
		throw new Error('Can not `useContext` outside of the `AppProvider`')
	}

	return data
}

interface IGlobalContext<DataType> {
	data: DataType
	setValue: (key: string, value: any) => void
}

export const initGlobalContext = <DataType>(data: DataType) => {
	/** Контекст */
	const Context = React.createContext<IGlobalContext<DataType> | null>(null)

	/** Провайдер */
	const Provider = Context.Provider

	/** Подключение контеста */
	const useContext = () => useGlobalContext<DataType>(Context)

	/** Хук для работы с глобальным состоянием */
	const useState = () => useGlobalState<DataType>(data)

	return { Context, Provider, useContext, useState }
}
