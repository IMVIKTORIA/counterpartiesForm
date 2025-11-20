import React, { useEffect, useState } from "react";
import { DataWithValidation } from "../../../shared/types";

/** Колонка с валидацией */
export default function ColumnWithValidation(data: DataWithValidation) {
  return (
    <div className="validation-column">
      <span
        className={
          data.isValid
            ? "validation-column__item"
            : "validation-column__item validation-column__item-invalid"
        }
        title={data.value}
      >
        {data.value}
      </span>
    </div>
  );
}
