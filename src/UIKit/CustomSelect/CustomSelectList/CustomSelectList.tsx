import React, { PropsWithChildren, useEffect, useRef } from 'react'
import Loader from '../../Loader/Loader';

interface CustomSelectListProps {
	rootRef: React.RefObject<HTMLDivElement>,
	isOpen: boolean,
	closeHandler: () => void,
	isLoading: boolean,
	listWidth: number
	/** Функция обратного вызова при скролле */
	scrollCallback?: () => void
}

/** Список элементов выпадающего списка */
function CustomSelectList({
	rootRef,
	closeHandler,
	isLoading,
	listWidth,
	children,
	scrollCallback
}: PropsWithChildren<CustomSelectListProps>) {

	// Ссылка на обертку поля
	const bodyRef = useRef<HTMLDivElement>(null);

	/** Клик снаружи списка */
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			console.log(rootRef.current)
			console.log(target)

			if (target instanceof Node && !rootRef.current?.contains(target)) {
				closeHandler();
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [])


	/** Обработчик скролла по вертикали */
	const onScroll = () => {
		const body = bodyRef.current!;
		const height = body.scrollHeight - body.offsetHeight;
		const scrollPosition = body.scrollTop;

		if ((height - scrollPosition) / height < 0.05 && !isLoading) {
			if (scrollCallback) scrollCallback()
		}
	}

	return (
		<div
			className='custom-select-list'

			style={{
				width: listWidth + "px"
			}}
		>
			<div ref={bodyRef} onScroll={onScroll} className="custom-select-list__content">
				{children}
				{isLoading && <Loader />}
			</div>
		</div>
	)
}

export default CustomSelectList
