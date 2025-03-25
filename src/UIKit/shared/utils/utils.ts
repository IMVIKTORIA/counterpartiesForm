import { AppFilter, DateFilter, IFiltersData, ListFilter, StringFilter } from "../../Filters/FiltersTypes"

/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
	let element = document.createElement('a')
	element.href = href
	element.style.display = 'none'
	document.querySelector('body')?.appendChild(element)
	element.click()
	element.remove()
}

/** Установка debounce */
export const setDebounce = (callback: (...args: any) => any, delay: number = 100) => {
	console.log('test')
	/** Идентификатор отложенного вызова */
	let timeoutId: number | undefined = undefined

	const call = () => {
		console.log(timeoutId)
		if (timeoutId) clearTimeout(timeoutId)
		timeoutId = setTimeout(callback, delay)
	}

	return call
}
	
/** Проверка указаны ли фильтры */
export function checkHasFilters(filters: IFiltersData): boolean {
	for(const key in filters) {
		const filter = filters[key];

		if((filter as AppFilter).value?.code) return true;
		if((filter as StringFilter).value) return true;
		if((filter as ListFilter).values?.length) return true;
		if((filter as DateFilter).valueFrom || (filter as DateFilter).valueTo) return true;
	}

	return false
}

export default {
	redirectSPA,
	setDebounce,
}
