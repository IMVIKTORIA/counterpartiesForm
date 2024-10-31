import React, { useEffect, useReducer, useRef, useState } from 'react'

/** Иконка загрузки */
function Loader() {
	return (
		<div className='loader'>
			<div className="loader__wrapper">
				<div className="loader__element">
				</div>
			</div>
		</div>
	)
}

export default Loader
