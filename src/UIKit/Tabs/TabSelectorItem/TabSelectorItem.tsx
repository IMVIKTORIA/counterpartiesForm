import React, { useEffect, useState } from 'react'

interface TabSelectorItemProps {
	handleClick: any,
	code: string,
	name: string,
	activeTabCode: string
}

function TabSelectorItem({ handleClick, code, name, activeTabCode }: TabSelectorItemProps) {

	return (
		<div
			className={
				code === activeTabCode
					? "tab-selector-item tab-selector-item_active"
					: "tab-selector-item"
			}
			onClick={() => handleClick(code)}
		>
			{name}
		</div>
	)
}

export default TabSelectorItem
