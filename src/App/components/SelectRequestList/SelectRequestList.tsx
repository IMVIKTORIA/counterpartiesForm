import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import {
  ItemData,
  ListColumnData,
} from "../../../UIKit/CustomList/CustomListTypes";
import Scripts from "../../shared/utils/clientScripts";
import {
  SelectRequestFilters,
  selectRequestContext,
} from "../../stores/SelectRequestContext";
import { SelectRequestData } from "../../shared/types";
import utils, { redirectSPA } from "../../shared/utils/utils";
import { localStorageDraftKey } from "../../shared/utils/constants";
import icons from "../../shared/icons";
import ColumnWithValidation from "./ColumnWithValidation/ColumnWithValidation";

interface SelectRequestListProps {
  /** Ширина списка */
  width: number;

  /** Возможность выбора строки */
  isSelectable: boolean;
  /** Множественный выбор */
  isMultipleSelect: boolean;
}

/** Список формы отбора контрагентов */
export default function SelectContractorsList({
  width,
  isMultipleSelect,
  isSelectable,
}: SelectRequestListProps) {
  const { data, setValue } = selectRequestContext.useContext();

  const fieldId =
    new URLSearchParams(window.location.search).get("field_id") ?? "";

  const programId =
    new URLSearchParams(window.location.search).get("programId") ?? "";

  /** Установка обработчика нажатия на поиск */
  const setSearchHandler = (callback: () => void) => {
    console.log("setSearchHandler");
    setValue("onClickSearch", callback);
  };

  /** Обработчик нажатия на номер задачи */
  const onClickContractor = async (props: ItemData) => {
    const contractorId = props.info;
    if (!contractorId) return;

    // Запись текущего url в localStorage
    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );
    localStorage.setItem("medpultContractorId", contractorId);
    localStorage.setItem(localStorageDraftKey, JSON.stringify(data));

    // Переход
    const link = Scripts.getContractorPageCode();
    redirectSPA(link);
  };

  /** Обработчик нажатия на номер обращения */
  const onClickRequest = async (props: ItemData) => {
    const requestId = props.info;
    if (!requestId) return;
    // Установка обращения
    utils.setRequest(requestId);

    // Переход
    const link = await Scripts.getRequestLink();
    utils.redirectSPA(link);
  };

  // Вычислить количество отобранных элементов
  useEffect(() => {
    Scripts.getRequestsCount(data.filters).then((count) =>
      setValue("elementsCount", count)
    );
  }, []);

  /** Доступ к поиску */
  const searchAccess =
    Scripts.getSelectRequestAccessSettings().searchButton == 2;

  /** Присвоить выбранные элементы */
  const setSelectedItems = (ids: string[]) => {
    setValue("selectedItemsIds", ids);
  };

  function IntegrationColumn(data: ItemData<boolean>) {
    const iconToShow = data?.info === true ? icons.IntegrationButton : null;
    return <div>{iconToShow}</div>;
  }

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "",
      code: "isIntegration",
      fr: 0.2,
      getCustomColumComponent: IntegrationColumn,
    }),
    new ListColumnData({
      name: data.filters.number.fieldName,
      code: data.filters.number.fieldCode,
      fr: 1,
      isSortable: searchAccess,
      isLink: true,
      onClick: onClickContractor,
    }),
    new ListColumnData({
      name: data.filters.type.fieldName,
      code: data.filters.type.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    ...(fieldId === "medpult-task-tou-medical"
      ? [
          new ListColumnData({
            name: "Статус на договоре ДМС",
            code: "statusDms",
            fr: 1,
            getCustomColumComponent: ColumnWithValidation,
          }),
        ]
      : []),
    new ListColumnData({
      name: data.filters.signImportance.fieldName,
      code: data.filters.signImportance.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.birthDate.fieldName,
      code: data.filters.birthDate.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.gender.fieldName,
      code: data.filters.gender.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.telephone.fieldName,
      code: data.filters.telephone.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
    new ListColumnData({
      name: data.filters.email.fieldName,
      code: data.filters.email.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
  ];

  return (
    <div className="select-request-list">
      <CustomList<SelectRequestFilters, SelectRequestData>
        setSearchHandler={setSearchHandler}
        searchData={data.filters}
        columnsSettings={columns}
        getDataHandler={(page, sortData, searchData) =>
          Scripts.getAppeals(page, sortData, searchData, programId)
        }
        height="70vh"
        listWidth={width}
        isSelectable={isSelectable}
        isMultipleSelect={isMultipleSelect}
        setSelectedItems={setSelectedItems}
        isAutoSearch={
          fieldId === "medpult-task-lpu-medical" ||
          fieldId === "medpult-task-tou-medical"
        }
      />
    </div>
  );
}
