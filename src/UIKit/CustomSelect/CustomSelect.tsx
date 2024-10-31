import React, { useEffect, useRef, useState } from 'react'
import CustomSelectRow from './CustomSelectRow/CustomSelectRow';
import CustomInput from '../CustomInput/CustomInput';
import { CustomSelectOption, CustomSelectProps } from './CustomSelectTypes';
import InputButton from '../InputButton/InputButton';
import icons from '../shared/icons';
import CustomSelectList from './CustomSelectList/CustomSelectList';

/** Выпадающий список */
function CustomSelect(props: CustomSelectProps) {
	const {
		isViewMode,
		getDataHandler,
		value,
		setValue
	} = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [listWidth, setListWidth] = useState<number>(100);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [listValues, setListValues] = useState<CustomSelectOption[]>([]);
	const rootRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const clickHandler = async () => {
		if (isViewMode) return;
		if (isOpen) return;
		// Показать список
		setIsOpen(true)
		// Показать лоадер
		setIsLoading(true)

		// Показать данные
		setListValues([]);
		const values = await getDataHandler();
		console.log(values);
		setListValues(values);

		// Скрыть лоадер
		setIsLoading(false)
	}

	const handleOptionClick = ({ value, code }: { value: string, code: string }) => {
		setIsOpen(false)
		setValue(value, code);
	}

	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	}, [isOpen])

	const buttonSvg = icons.Triangle;

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				{...props}
				clickHandler={clickHandler}
				wrapperRef={wrapperRef}
				cursor={isViewMode ? 'text' : 'pointer'}
				isOpen={isOpen}
				buttons={[<InputButton svg={buttonSvg} clickHandler={clickHandler} />]}
				readOnly
			/>
			{isOpen &&
				<CustomSelectList
					rootRef={rootRef}
					isOpen={isOpen}
					closeHandler={() => setIsOpen(false)}
					isLoading={isLoading}
					listWidth={listWidth}
				>
					{listValues.map(value =>
						<CustomSelectRow
							value={value.value}
							code={value.code}
							clickHandler={handleOptionClick}
						/>
					)}
				</CustomSelectList>
			}
		</div>
	)
}

export default CustomSelect