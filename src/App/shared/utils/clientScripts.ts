import {
  FetchData,
  ItemData,
  ItemDataString,
  SortData,
} from "../../../UIKit/CustomList/CustomListTypes";
import { ObjectItem } from "../../../UIKit/Filters/FiltersTypes";
import { FetchInputData } from "../../../UIKit/shared/types/types";
import { SelectRequestFilters } from "../../stores/SelectRequestContext";
import { SelectRequestData } from "../types";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получение списка обращений */
async function getAppeals(
  page: number,
  sortData?: SortData,
  searchData?: SelectRequestFilters
): Promise<FetchData<SelectRequestData>> {
  await randomDelay();

  console.log({
    page,
    sortData,
    searchData,
  });

  const mockData: SelectRequestData = {
    number: new ItemData({ value: "Иванов Иван Иванович", info: "test" }),
    type: new ItemData({ value: "Физлицо", info: "test" }),
    signImportance: new ItemData({ value: "VIP", info: "test" }),
    birthDate: new ItemDataString("06.12.2023"),
    gender: new ItemData({ value: "муж", info: "test" }),
    telephone: new ItemData({ value: "+7 912 345 67 89", info: "test" }),
    email: new ItemData({ value: "test@test.com", info: "test" }),
  };
  return {
    items: Array(5)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new SelectRequestData(mockData),
        };
      }),
    hasMore: true,
  };
}

/** Получение количества задач по фильтрам */
async function getRequestsCount(
  searchData?: SelectRequestFilters
): Promise<number> {
  return 0;
}

/** Получение статусов обращений */
async function getTypes(): Promise<ObjectItem[]> {
  await randomDelay();

  const types: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Физлицо" }),
    new ObjectItem({ code: "test1", value: "Юрлицо" }),
    new ObjectItem({ code: "test2", value: "ИП" }),
  ];

  return types;
}

/** Получение статусов 3Л */
async function getGenders(): Promise<ObjectItem[]> {
  await randomDelay();

  const genders: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "муж" }),
    new ObjectItem({ code: "test1", value: "жен" }),
  ];

  return genders;
}

/** Получение каналов */
async function getSorts(): Promise<ObjectItem[]> {
  await randomDelay();

  const sorts: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "Затсрахованный" }),
    new ObjectItem({ code: "test1", value: "Страхователь" }),
    new ObjectItem({ code: "test2", value: "ЛПУ" }),
    new ObjectItem({ code: "test3", value: "ТОУ" }),
    new ObjectItem({ code: "test4", value: "Врач" }),
    new ObjectItem({ code: "test4", value: "Банк" }),
  ];

  return sorts;
}
/** Получение признака важности */
async function getSignImportances(): Promise<ObjectItem[]> {
  await randomDelay();

  const signImportances: ObjectItem[] = [
    new ObjectItem({ code: "test", value: "VIP" }),
    new ObjectItem({ code: "test1", value: "Проблемный" }),
    new ObjectItem({ code: "test2", value: "Сотрудник Сбер" }),
  ];

  return signImportances;
}

/** Получение id обращения по id задачи */
async function getRequestIdByTaskId(taskId: string): Promise<string> {
  return "test";
}

/** Получение ссылки для перехода на страницу обращения */
async function getRequestLink(): Promise<string> {
  return "#test";
}

/** Уровни доступа */
enum AccessLevel {
  /** Нет доступа, даже не видим */
  noAccess = 0,
  /** Только видим, не можем писать или менять */
  readOnly = 1,
  /** Видим, читаем и можем писать или нажимать на кнопку/ссылку */
  writeRead = 2,
}

/** Настройки доступа формы отбора задач */
interface ISelectTaskAccessSettings {
  searchButton: AccessLevel;
  appendResponsible: AccessLevel;
}

/** Получить настройки доступа формы отбора задач */
function getSelectRequestAccessSettings(): ISelectTaskAccessSettings {
  return {
    searchButton: 2,
    appendResponsible: 2,
  };
}

/** Получить ссылку формы отбора обращений */
function getSelectRequestLink(): string {
  return "#selectRequestTest";
}

/** Получить ссылку формы отбора застрахованных */
function getSelectInsuredLink(): string {
  return "#selectRequestTest";
}

async function OnInit(): Promise<void> {
  await randomDelay();
}

export default {
  getAppeals,
  getRequestsCount,
  getTypes,
  getGenders,
  getSignImportances,
  getSorts,
  getRequestIdByTaskId,
  getRequestLink,
  getSelectRequestAccessSettings,
  getSelectRequestLink,
  getSelectInsuredLink,
  OnInit,
};
