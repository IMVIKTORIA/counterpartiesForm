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

export default {
	redirectSPA,
	setDebounce,
}
