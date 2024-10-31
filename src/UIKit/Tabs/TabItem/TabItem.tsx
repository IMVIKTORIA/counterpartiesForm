import React, { useState } from 'react'

interface TabItemProps {
	children: any,
	code: string,
	name: string
}

function TabItem({ children, code, name }: TabItemProps) {
	return <div className="tab-item">{children}</div>
}

export default TabItem
