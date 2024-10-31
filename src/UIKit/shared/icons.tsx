import React from "react"

const Search = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle
			cx="10"
			cy="10"
			r="6"
			stroke="#64C3F4"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M14.5 14.5L19 19"
			stroke="#64C3F4"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Calendar = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
			stroke="#64C3F4"
			stroke-width="2"
			stroke-linecap="round"
		/>
		<rect x="6" y="12" width="3" height="3" rx="0.5" fill="#64C3F4" />
		<rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#64C3F4" />
		<rect x="15" y="12" width="3" height="3" rx="0.5" fill="#64C3F4" />
	</svg>
)

const Triangle = (
	<svg
		height="10px"
		width="10px"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill="#64C3F4"
			d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
		/>
	</svg>
)

const Cross = (
	<svg
		height="100%"
		width="100%"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M8 8L16 16" stroke="#64C3F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		<path d="M16 8L8 16" stroke="#64C3F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
)

const Add = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<path
			d="M12 8V16M8 12H16"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Edit = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Delete = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1C5.477 1 1 5.477 1 11C1 16.523 5.477 21 11 21Z"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<path
			d="M13.8284 8.17218L8.17157 13.829M8.17157 8.17218L13.8284 13.829"
			stroke="#45B0E6"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Apply = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 22C13.3135 22.0017 14.6143 21.7438 15.8278 21.2412C17.0413 20.7385 18.1435 20.001 19.071 19.071C20.001 18.1435 20.7385 17.0413 21.2412 15.8278C21.7438 14.6143 22.0017 13.3135 22 12C22.0017 10.6865 21.7438 9.3857 21.2411 8.17222C20.7385 6.95875 20.001 5.85656 19.071 4.92901C18.1435 3.99902 17.0413 3.26151 15.8278 2.75885C14.6143 2.25619 13.3135 1.99831 12 2.00001C10.6865 1.99833 9.3857 2.25623 8.17222 2.75889C6.95875 3.26154 5.85656 3.99904 4.92901 4.92901C3.99904 5.85656 3.26154 6.95875 2.75889 8.17222C2.25623 9.3857 1.99833 10.6865 2.00001 12C1.99831 13.3135 2.25619 14.6143 2.75885 15.8278C3.26151 17.0413 3.99902 18.1435 4.92901 19.071C5.85656 20.001 6.95875 20.7385 8.17222 21.2411C9.3857 21.7438 10.6865 22.0017 12 22Z"
			stroke="#21A038"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<path
			d="M8 12L11 15L17 9"
			stroke="#21A038"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const Deny = (
	<svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
			stroke="#FF3333"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<path
			d="M14.8284 9.17218L9.17157 14.829M9.17157 9.17218L14.8284 14.829"
			stroke="#FF3333"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const SortArrow = (
	<svg
		height="7px"
		width="16px"
		viewBox="0 0 16 16"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		stroke=""
	>
		<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
		<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
		<g id="SVGRepo_iconCarrier">
			<path
				fill="#45B0E6"
				d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
			></path>
		</g>
	</svg>
)

const Unchecked = (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect
			x="0.625"
			y="0.625"
			width="18.75"
			height="18.75"
			rx="1.875"
			fill="white"
			stroke="#BFBFC2"
			stroke-width="1.25"
		/>
	</svg>
)

const Checked = (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
		<rect width="20" height="20" rx="3" fill="#2F91E3" />
		<line x1="3.87177" y1="9.77934" x2="10.4172" y2="14.4539" stroke="#F2F4F6" stroke-width="3" />
		<line x1="16.2678" y1="3.8929" x2="8.20653" y2="14.7745" stroke="#F2F4F6" stroke-width="3" />
	</svg>
)

const DeleteSearchItem = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16.2426 7.75827L7.75736 16.2435M16.2426 16.2435L7.75736 7.75827" stroke="#AAAAAD" stroke-width="2" stroke-linecap="round" />
	</svg>
)

const FilterIcon = (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1 3H15M3 8H13M6 13H10"
			stroke="#21A038"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

const redCircle = (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="8" cy="8" r="8" fill="#FF3333" />
	</svg>
)

const filterItemArrow = (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M6 15L12 9L18 15"
			stroke="#6B6B6F"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
)

export default {
	/** Лупа */
	Search,
	/** Календарь */
	Calendar,
	/** Маленький треугольник */
	Triangle,
	/** Крест */
	Cross,
	/** Кнопка добавить */
	Add,
	/** Кнопка редактировать */
	Edit,
	/** Кнопка удалить */
	Delete,
	/** Кнопка сохранить изменения */
	Apply,
	/** Кнопка отменить изменения */
	Deny,
	/** Кнопка сортировки */
	SortArrow,
	/** Чекбокс отмечено */
	Checked,
	/** Чекбокс не отмечено */
	Unchecked,
	/** Иконка удаления элемента фильтра с поиском */
	DeleteSearchItem,
	/** Иконка фильтра */
	FilterIcon,
	/** Красный круг */
	redCircle,
	/** Кнопка раскрытия фильтра */
	filterItemArrow
}
