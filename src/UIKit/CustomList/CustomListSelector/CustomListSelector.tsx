import React from 'react'
import Icons from '../../shared/icons'

interface CustomListSelectorProps extends React.ComponentProps<'div'> {
	/** Обработчик нажатия на selector */
	onClickSelector: () => void;
	/** Селектор активен */
	isChecked: boolean;
	/** Выбор нескольких */
	isMultiple?: boolean;
}

/** Селектор строки */
function CustomListSelector(props: CustomListSelectorProps) {
	const { onClickSelector, isChecked, isMultiple } = props

	// Вёрстка селектора нескольких (квадратный селектор)
	const multipleLayout = isChecked ? Icons.Checked : Icons.Unchecked
	const singleLayout = isChecked ? Icons.CheckedRadio : Icons.UncheckedRadio
	return (
		<div {...props} className='custom-list-selector'>
			<div onClick={onClickSelector}>
				{isMultiple ? multipleLayout : singleLayout}
			</div>
		</div>
	)
}

export default CustomListSelector
