import React, { useEffect, useState } from "react";
import FiltersWrapper from "../../../UIKit/Filters/FiltersWrapper/FiltersWrapper";
import FilterItemString from "../../../UIKit/Filters/FilterItems/FilterItemString/FilterItemString";
import { selectRequestContext } from "../../stores/SelectRequestContext";
import {
  IFilter,
  ObjectItem,
  ListFilter,
} from "../../../UIKit/Filters/FiltersTypes";
import FilterItemDates from "../../../UIKit/Filters/FilterItems/FilterItemDates/FilterItemDates";
import FilterItemSearch from "../../../UIKit/Filters/FilterItems/FilterItemSearch/FilterItemSearch";
import FilterItemCategory from "../../../UIKit/Filters/FilterItems/FilterItemCategory/FilterItemCategory";
import Scripts from "../../shared/utils/clientScripts";
import { saveState } from "../../shared/utils/utils";
import {
  applyNumbersMask,
  applyPhoneMask,
} from "../../../UIKit/shared/utils/masks";
import SliderPanel from "../SelectRequestForm/SliderPanel/SliderPanel";

interface SelectRequestFiltersProps {}

/** Фильтры формы отбора обращений */
export default function SelectRequestFiltersForm({}: SelectRequestFiltersProps) {
  const { data, setValue } = selectRequestContext.useContext();
  const filters = data.filters;

  const fieldId =
    new URLSearchParams(window.location.search).get("field_id") ?? "";
  const programId =
    new URLSearchParams(window.location.search).get("programId") ?? "";

  //Состояние слайдера
  const [sliderActive, setSliderActive] = useState<boolean>(
    programId ? false : true
  );
  // Флаг блокировки переключения слайдера
  const isSliderDisabled = !programId;

  /** Статусы */
  const [types, setTypes] = useState<ObjectItem[]>([]);
  /** Каналы */
  const [sorts, setSorts] = useState<ObjectItem[]>([]);
  /** Признак важности */
  const [signImportances, setSignImportances] = useState<ObjectItem[]>([]);
  /** Статусы ЗЛ */
  const [genders, setGenders] = useState<ObjectItem[]>([]);

  /** Получение вариантов категорий */
  React.useLayoutEffect(() => {
    Scripts.getTypes().then((items) => setTypes(items));
    Scripts.getSorts().then((items) => setSorts(items));
    Scripts.getSignImportances().then((items) => setSignImportances(items));
    Scripts.getGenders().then((items) => setGenders(items));
  }, []);

  /** Изменение значения конкретного фильтра */
  const changeFilterValue = (key: string, value: IFilter) => {
    const currentFilters = filters;
    (currentFilters as any)[key] = value;
    setValue("filters", currentFilters);
  };

  const changeValueConstructor = (key: string) => {
    return (value: IFilter) => changeFilterValue(key, value);
  };

  /** Сброс фильтров */
  const resetFilters = () => {
    data.filters.reset();
    setValue("filters", data.filters);
  };

  /** Обработчик нажатия на кнопку поиска */
  const searchHandler = async () => {
    // Количество отобранных элементов
    const elementsCount = await Scripts.getRequestsCount(
      data.filters,
      programId
    );
    setValue("elementsCount", elementsCount);

    // Поиск
    data.onClickSearch();
  };

  // Установка состояния обертки
  const setIsOpenFactory = (code: string) => {
    return (isOpen: boolean) => {
      const filterStates = data.filterStates;

      (filterStates as any)[code] = isOpen;

      setValue("filterStates", filterStates);
    };
  };

  /** Сохранение состояния формы */
  const saveStateHandler = () => {
    saveState(data);
  };

  /** Ссылка на форму отбора обращения */
  const selectRequestHref = Scripts.getSelectRequestLink();
  /** Ссылка на форму отбора застрахованного */
  const selectInsuredHref = Scripts.getSelectInsuredLink();

  // useEffect(() => {
  //   if (!sorts.length) return;

  //   let targetCode: string | null = null;

  //   if (fieldId === "medpult-task-lpu-medical") {
  //     targetCode = "018fa5b1-b73e-7816-97ff-55a13b5c6825"; // ЛПУ
  //   } else if (fieldId === "medpult-task-tou-medical") {
  //     targetCode = "018f9a3f-db8b-7b32-82c0-f9ad7a5614c7"; // ТОУ
  //   }

  //   if (targetCode) {
  //     const targetSort = sorts.find((item) => item.code === targetCode);
  //     if (targetSort) {
  //       filters.sort = new ListFilter(
  //         filters.sort.fieldCode,
  //         filters.sort.fieldName,
  //         [targetSort]
  //       );
  //       data.filterStates.sort = true;
  //       setValue("filters", filters);
  //       setValue("filterStates", data.filterStates);
  //     }
  //   }
  // }, [sorts, fieldId]);

  // useEffect(() => {
  //   if (fieldId === "medpult-task-tou-medical") {
  //     filters.isTou = true;
  //   } else if (fieldId === "medpult-task-lpu-medical") {
  //     filters.isTou = false;
  //   }
  //   setValue("filters", filters);
  // }, [fieldId]);

  /** Синхронизация слайдера с фильтром */
  useEffect(() => {
    filters.isShowAll = sliderActive;
    setValue("filters", filters);
  }, [sliderActive]);

  /** Обработчик слайдера */
  const toggleSlider = (isActive: boolean) => {
    if (isSliderDisabled) return;
    setSliderActive(isActive);
    filters.isShowAll = isActive;
    setValue("filters", filters);
    searchHandler();
  };

  useEffect(() => {
    if (!sorts.length) return;

    let targetCode: string | null = null;

    if (fieldId === "medpult-task-lpu-medical") {
      targetCode = "018fa5b1-b73e-7816-97ff-55a13b5c6825"; // ЛПУ
    } else if (fieldId === "medpult-task-tou-medical") {
      targetCode = "018f9a3f-db8b-7b32-82c0-f9ad7a5614c7"; // ТОУ
    }

    if (targetCode) {
      const targetSort = sorts.find((item) => item.code === targetCode);
      if (targetSort) {
        if (fieldId === "medpult-task-tou-medical") {
          filters.isTou = true;
        } else {
          filters.isTou = false;
        }

        filters.sort = new ListFilter(
          filters.sort.fieldCode,
          filters.sort.fieldName,
          [targetSort]
        );
        data.filterStates.sort = true;

        setValue("filters", filters);
        setValue("filterStates", data.filterStates);

        (async () => {
          try {
            const elementsCount = await Scripts.getRequestsCount(
              filters,
              programId
            );
            setValue("elementsCount", elementsCount);
            data.onClickSearch();
          } catch (err) {
            console.error("Error while auto-searching for LPU/TOU:", err);
          }
        })();
      }
    }
  }, [sorts, fieldId]);

  return (
    <FiltersWrapper
      searchHandler={searchHandler}
      resetHandler={resetFilters}
      isSearchButtonDisabled={
        Scripts.getSelectRequestAccessSettings().searchButton < 2
      }
    >
      {(fieldId === "medpult-task-lpu-medical" ||
        fieldId === "medpult-task-tou-medical") && (
        <SliderPanel
          title="Полный перечень ЛПУ/ТОУ"
          isVisible={sliderActive ?? false}
          setIsVisible={toggleSlider}
        />
      )}
      <FilterItemString
        setIsOpenInit={setIsOpenFactory(data.filters.number.fieldCode)}
        isOpenInit={data.filterStates.number}
        title={data.filters.number.fieldName}
        filterValue={data.filters.number}
        setFilterValue={changeValueConstructor(data.filters.number.fieldCode)}
      />
      <FilterItemCategory
        setIsOpenInit={setIsOpenFactory(data.filters.type.fieldCode)}
        isOpenInit={data.filterStates.type}
        title={data.filters.type.fieldName}
        filterValue={data.filters.type}
        variants={types}
        setFilterValue={changeValueConstructor(data.filters.type.fieldCode)}
      />
      <FilterItemCategory
        setIsOpenInit={setIsOpenFactory(data.filters.sort.fieldCode)}
        isOpenInit={data.filterStates.sort}
        title={data.filters.sort.fieldName}
        filterValue={data.filters.sort}
        variants={sorts}
        setFilterValue={changeValueConstructor(data.filters.sort.fieldCode)}
      />
      <FilterItemCategory
        setIsOpenInit={setIsOpenFactory(data.filters.signImportance.fieldCode)}
        isOpenInit={data.filterStates.signImportance}
        title={data.filters.signImportance.fieldName}
        filterValue={data.filters.signImportance}
        variants={signImportances}
        setFilterValue={changeValueConstructor(
          data.filters.signImportance.fieldCode
        )}
      />
      <FilterItemDates
        setIsOpenInit={setIsOpenFactory(data.filters.birthDate.fieldCode)}
        isOpenInit={data.filterStates.birthDate}
        title={data.filters.birthDate.fieldName}
        filterValue={data.filters.birthDate}
        setFilterValue={changeValueConstructor(
          data.filters.birthDate.fieldCode
        )}
      />
      <FilterItemCategory
        setIsOpenInit={setIsOpenFactory(data.filters.gender.fieldCode)}
        isOpenInit={data.filterStates.gender}
        title={data.filters.gender.fieldName}
        filterValue={data.filters.gender}
        variants={genders}
        setFilterValue={changeValueConstructor(data.filters.gender.fieldCode)}
      />
      <FilterItemString
        setIsOpenInit={setIsOpenFactory(data.filters.telephone.fieldCode)}
        isOpenInit={data.filterStates.telephone}
        title={data.filters.telephone.fieldName}
        filterValue={data.filters.telephone}
        setFilterValue={changeValueConstructor(
          data.filters.telephone.fieldCode
        )}
        maskFunction={applyPhoneMask}
        placeholder={"+7 000 000 00 00"}
      />
      <FilterItemString
        setIsOpenInit={setIsOpenFactory(data.filters.email.fieldCode)}
        isOpenInit={data.filterStates.email}
        title={data.filters.email.fieldName}
        filterValue={data.filters.email}
        setFilterValue={changeValueConstructor(data.filters.email.fieldCode)}
      />
      <FilterItemString
        setIsOpenInit={setIsOpenFactory(data.filters.inn.fieldCode)}
        isOpenInit={data.filterStates.inn}
        title={data.filters.inn.fieldName}
        filterValue={data.filters.inn}
        setFilterValue={changeValueConstructor(data.filters.inn.fieldCode)}
      />
      {/* <FilterItemString setIsOpenInit={setIsOpenFactory(data.filters.request.fieldCode)} isOpenInit={data.filterStates.request} title={data.filters.request.fieldName} filterValue={data.filters.request} setFilterValue={changeValueConstructor(data.filters.request.fieldCode)} /> */}
      {/* <FilterItemString isOpenInit={data.filterStates.insured} title={data.filters.insured.fieldName} filterValue={data.filters.insured} setFilterValue={changeValueConstructor(data.filters.insured.fieldCode)} /> */}
    </FiltersWrapper>
  );
}
