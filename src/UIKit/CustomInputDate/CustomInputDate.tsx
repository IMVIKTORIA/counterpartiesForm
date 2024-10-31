import React, { useRef } from 'react'
import CustomInput from '../CustomInput/CustomInput';
import InputButton from '../InputButton/InputButton';
import Masks from '../shared/utils/masks';
import icons from '../shared/icons';
import { InputDateType } from './CustomInputDateTypes';
import { CustomInputProps } from '../shared/types/types';

interface CustomInputDateProps extends CustomInputProps {
	/** Тип даты */
	type: InputDateType
}

/** Поле ввода даты */
function CustomInputDate(props: CustomInputDateProps) {
	const { type = InputDateType.date, setValue } = props;
	const pickerRef = useRef<HTMLInputElement>(null)

	const buttonSvg = icons.Calendar;

	// Открыть календарь
	const openPicker = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		picker.showPicker();
	}

	//  При выборе даты/времени в календаре
	const onChangePickerValue = () => {
		const picker = pickerRef.current;
		if (!picker) return;

		let value = "";
		switch (picker.type) {
			case InputDateType.date:
				{
					const values = picker.value.split("-");
					value = values.reverse().join(".");
					break;
				}
			case InputDateType.time:
				{
					value = picker.value;
					break;
				}
			case InputDateType.datetime:
				{
					const values = picker.value.split("T");
					const dateValues = values[0].split("-");
					const timeValue = values[1];

					value = dateValues.reverse().join(".") + " " + timeValue;
					break;
				}
		}

		setValue(value)
	}

	return (
		<div className='custom-input-date'>
			<input type={type} onChange={onChangePickerValue} className='custom-input-date__picker' ref={pickerRef} />
			<CustomInput
				{...props}
				type='text'
				buttons={<InputButton svg={buttonSvg} clickHandler={openPicker} />}
				placeholder={props.placeholder ?? "ДД.ММ.ГГГГ"}
				maskFunction={Masks.applyDateMask}
			/>
		</div>
	)
}

export default CustomInputDate
