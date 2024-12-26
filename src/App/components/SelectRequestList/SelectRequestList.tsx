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

interface SelectRequestListProps {
  /** Ширина списка */
  width: number;
}

/** Фильтры формы отбра задач */
export default function SelectRequestList({ width }: SelectRequestListProps) {
  const { data, setValue } = selectRequestContext.useContext();

  /** Установка обработчика нажатия на поиск */
  const setSearchHandler = (callback: () => void) => {
    console.log("setSearchHandler");
    setValue("onClickSearch", callback);
  };

  /** Обработчик нажатия на номер задачи */
  const onClickTaskNumber = async (props: ItemData) => {
    const taskId = props.info;
    if (!taskId) return;

    // Запись текущего url в localStorage
    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );
    localStorage.setItem("taskId", taskId);

    localStorage.setItem(localStorageDraftKey, JSON.stringify(data));
    // Переход
    const link = Scripts.getContractorPageCode();
    redirectSPA(link);
  };

  /**
    // Установка обращения
    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    utils.setRequest(requestId);

    localStorage.setItem("taskId", taskId);

    // Переход
    const link = await Scripts.getRequestLink();
    utils.redirectSPA(link);*/

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

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: data.filters.number.fieldName,
      code: data.filters.number.fieldCode,
      fr: 1,
      isSortable: searchAccess,
      isLink: true,
      onClick: onClickTaskNumber,
    }),
    new ListColumnData({
      name: data.filters.type.fieldName,
      code: data.filters.type.fieldCode,
      fr: 1,
      isSortable: searchAccess,
    }),
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
        getDataHandler={Scripts.getAppeals}
        height="70vh"
        listWidth={width}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
}
