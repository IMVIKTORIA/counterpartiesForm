import React, { useEffect, useRef, useState } from "react";
import {
  selectRequestContext,
  SelectRequestData,
} from "../../stores/SelectRequestContext";
import Header from "../Header/Header";
import SelectRequestFiltersForm from "../SelectRequestFiltersForm/SelectRequestFiltersForm";
import SelectRequestList from "../SelectRequestList/SelectRequestList";
import { getDataFromDraft } from "../../shared/utils/utils";
import Scripts from "../../shared/utils/clientScripts";

/** Форма отбора обращений */
export default function SelectRequestForm() {
  const [data, setValue] = selectRequestContext.useState();
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Подгрузка данных
  React.useLayoutEffect(() => {
    // Данные формы из черновика
    let draftData: SelectRequestData;
    try {
      draftData = getDataFromDraft();
    } catch (e) {
      throw new Error("Ошибка получения данных из черновика: " + e);
    }

    if (!draftData) return;

    // Установка фильтров
    setValue("filters", draftData.filters);
    // Установка состояния оберток фильтров
    setValue("filterStates", draftData.filterStates);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [isShowFilters, setIsShowFilters] = useState<boolean>(true);
  const toggleShowFilters = () => setIsShowFilters(!isShowFilters);

  // Ширина списка
  const [listWidth, setListWidth] = useState<number>(0);

  // Назначение обработчиков событий
  useEffect(() => {
    handleResizeWrapper();
    window.addEventListener("resize", handleResizeWrapper);

    return () => {
      window.removeEventListener("resize", handleResizeWrapper);
    };
  }, []);

  // Обработчик изменения размера
  const handleResizeWrapper = () => {
    const width = contentWrapperRef.current?.getBoundingClientRect().width ?? 0;
    setListWidth(width);
  };

  //Инициализация
  useEffect(() => {
    const initialize = async () => {
      await Scripts.OnInit();
    };
    initialize();
  }, []);

  return (
    <selectRequestContext.Provider value={{ data, setValue }}>
      <div className="select-request-form">
        <div className="select-request-form__header">
          <Header
            clickFilterHandler={toggleShowFilters}
            elementsCount={data.elementsCount}
            title="Форма отбора контрагентов"
          />
        </div>
        <div className="select-request-form__content" ref={contentWrapperRef}>
          <div
            className={`select-request-form__filters${
              !isShowFilters ? " select-request-form__filters_hidden" : ""
            }`}
          >
            <SelectRequestFiltersForm />
          </div>
          <div className="select-request-form__list">
            <div>
              <SelectRequestList width={listWidth} />
            </div>
          </div>
        </div>
      </div>
    </selectRequestContext.Provider>
  );
}
