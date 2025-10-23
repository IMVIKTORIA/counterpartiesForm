import React from "react"

const ReturnButton = (
	<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="21" cy="21" r="21" fill="#ECEFF1"></circle>
		<line
			x1="23.5507"
			y1="28.4649"
			x2="16.0341"
			y2="20.9483"
			stroke="#9EA3A8"
			stroke-width="2"
		></line>
		<line
			x1="23.7071"
			y1="14.7071"
			x2="16.7071"
			y2="21.7071"
			stroke="#9EA3A8"
			stroke-width="2"
		></line>
	</svg>
)

const IntegrationButton = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_128_421)">
      <path
        d="M8.75 5.25V3.75C8.75 2.64543 7.85457 1.75 6.75 1.75H3.75C2.64543 1.75 1.75 2.64543 1.75 3.75V6.75C1.75 7.85457 2.64543 8.75 3.75 8.75H5.25M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7"
        stroke="#45B0E6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 5.25C6.0335 5.25 5.25 6.0335 5.25 7M8.75 5.25H10.25C11.3546 5.25 12.25 6.14543 12.25 7.25V10.25C12.25 11.3546 11.3546 12.25 10.25 12.25H7C6.0335 12.25 5.25 11.4665 5.25 10.5V8.75"
        stroke="#45B0E6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_128_421">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default {
	/** Кнопка назад */
	ReturnButton,
	/**Интеграция */
	IntegrationButton,
}
