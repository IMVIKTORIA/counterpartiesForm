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
import { redirectSPA } from "../utils/utils";

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
  searchData?: SelectRequestFilters,
  programId?: string
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
    statusDms: { value: "Новый", isValid: false },
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
          data: {
            ...new SelectRequestData(mockData),
            isIntegration: new ItemData({
              value: "",
              info: Boolean(Math.random() < 0.5),
            }),
          },
        };
      }),
    hasMore: true,
  };
}

/** Получение количества задач по фильтрам */
async function getRequestsCount(
  searchData?: SelectRequestFilters,
  programId?: string
): Promise<number> {
  return 1;
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
  createContractorButton: AccessLevel;
  selectButton: AccessLevel;
  page: AccessLevel;
}

/** Получить настройки доступа формы отбора задач */
function getSelectRequestAccessSettings(): ISelectTaskAccessSettings {
  return {
    searchButton: 2,
    createContractorButton: 2,
    selectButton: 2,
    page: 2,
  };
}

/** Получить ссылку формы контрагента */
function getCounterpartytLink(): string {
  return "#selectСounterpartyTest";
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

// При переносе удалить
declare const Context: any;
/**
 * Из оригинальных скриптов
 */
/** Получение кода страницы Договор */
function getTreatyPageCode(): string {
  return Context.data.insurance_treaty_page_code;
}
/** Получение кода страницы Рабочий стол */
function getWortTablePageCode(): string {
  return Context.data.worktable_page_code;
}
/** Получение кода страницы Обращение */
function getRequestPagePath(): string {
  return Context.data.request_page_path;
}
/** Получение кода страницы Контрагента */
function getContractorPageCode(): string {
  return Context.data.contractor_page_path;
}
/**
 * Установить застрахованного в фильтр (Из оригинальных скриптов)
 */
/** Данные поля формы */
interface IInputData {
  /** Строковое значение */
  value: string;
  /** Дополнительные данные */
  data?: any;
}
/** Значение поля ввода типа Категория */
class InputDataCategory implements IInputData {
  value: string;
  data: {
    code: string;
  };

  constructor(value?: string, code?: string) {
    this.value = value ?? "";
    this.data = { code: code ?? "" };
  }
}
/** Получение контагента по id */
async function getContractorById(id: string): Promise<InputDataCategory> {
  return new InputDataCategory("", "");
}

/** Установить страхователя в договор */
async function setContractInsurer(contractorId: string) {
  const treatyDraftKey = "medpult-treaty-draft";
  const draftData = localStorage.getItem(treatyDraftKey);

  if (draftData) {
    const data = JSON.parse(draftData);
    data.values.policyHolder = await getContractorById(contractorId);

    localStorage.setItem(treatyDraftKey, JSON.stringify(data));
  }
}
/** Установить ЛПУ договора */
async function setContractLPU(contractorId: string) {
  const treatyDraftKey = "medpult-treaty-draft";
  const draftData = localStorage.getItem(treatyDraftKey);

  if (draftData) {
    const data = JSON.parse(draftData);
    data.values.lpu = await getContractorById(contractorId);

    localStorage.setItem(treatyDraftKey, JSON.stringify(data));
  }
}
/** Установить Ответственное лицо в строку */
async function setContractResponsible(
  contractorId: string,
  index: string | null
) {
  const treatyDraftKey = "medpult-treaty-draft";
  const draftData = localStorage.getItem(treatyDraftKey);

  if (draftData) {
    const data = JSON.parse(draftData);
    if (index !== null) {
      data.values.sides[Number(index)].actualData.contractor =
        await getContractorById(contractorId);
    }

    localStorage.setItem(treatyDraftKey, JSON.stringify(data));
  }
}

/** Запись Застрахованного в черновик
 * @param fieldId Идентификатор html элемента, в который запишется значение
 * @param contractorId Идентификатор контрагента
 */
async function assignInsured(fieldId: string, contractorId: string) {
  // const draftObj = JSON.parse(localStorage.getItem("medpult-draft"));
  // const draftItem = {
  //     fieldId: fieldId,
  //     contractorId: contractorId
  // }
  // if (draftObj == undefined) {
  //     localStorage.setItem("medpult-draft", JSON.stringify([
  //         draftItem
  //     ]));
  //     return;
  // }
  // const itemIndex = draftObj.findIndex((d: any) => d.fieldId === fieldId);
  // if (itemIndex === -1) {
  //     draftObj.push(draftItem)
  // } else {
  //     draftObj[itemIndex] = draftItem;
  // }
  // localStorage.setItem("medpult-draft", JSON.stringify(draftObj));
}

//Добавить номер телефона к контрагенту
const addContractorPhone = async (contractorId: string, phone: any) => {};

async function createRequestForContractor(
  phone: any,
  contractorId?: string
): Promise<string | undefined> {
  return "0197c997-a1df-71ea-88e2-0c9ec3d1f792";
}

/** Получение ссылки для перехода на страницу входящего звонка */
function getIcomingCallLink(): string {
  return Context.data.contractor_page_path;
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
  getContractorById,

  getCounterpartytLink,
  getTreatyPageCode,
  getWortTablePageCode,
  getRequestPagePath,
  getContractorPageCode,
  setContractInsurer,
  setContractLPU,
  setContractResponsible,
  addContractorPhone,

  assignInsured,
  createRequestForContractor,
  getIcomingCallLink,
};
