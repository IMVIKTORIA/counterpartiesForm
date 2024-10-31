/** Маски для полей ввода */

/** Маска дат */
const applyDateMask = (value: string): string => {
	const match = value.match(/(\d{1,2})?\D*(\d{1,2})?\D*(\d{1,4})?/m)?.slice(1)
	if (!match) return ''

	if (Number(match[1]) > 12) match[1] = '12'
	if (match[1]?.length == 2 && Number(match[1]) < 1) match[1] = '01'

	if (match[2]?.length == 4) {
		const lastDayOfMonth = new Date(Number(match[2]), Number(match[1]), 0).getDate()

		if (match[1]?.length == 2) {
			if (Number(match[0]) > lastDayOfMonth) match[0] = lastDayOfMonth.toString()
			if (match[0]?.length == 2 && Number(match[0]) < 1) match[0] = '01'
		}
	}

	value = match.filter((val) => val).join('.') ?? ''
	return value
}

/** Маска чисел с плавающей точкой */
export const applyNumbersMask = (value: string): string => {
	return (
		value
			.match(/\d+[,|\.]?\d*/g)
			?.join('')
			.replace('.', ',') ?? ''
	)
}

export default {
	applyDateMask,
	applyNumbersMask,
}
