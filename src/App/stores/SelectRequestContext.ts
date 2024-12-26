import React from "react";
import { initGlobalContext } from "./GlobalContext";
import {
  AppFilter,
  DateFilter,
  IFiltersData,
  ListFilter,
  StringFilter,
} from "../../UIKit/Filters/FiltersTypes";

/** Данные формы отбора обращения */
export class SelectRequestData {
  /** Фильтры поиска */
  filters: SelectRequestFilters;
  /** Состояние оберток фильтров */
  filterStates: SelectRequestFiltersStates;
  /** Обработчик нажатия на кнопку поиск */
  onClickSearch: () => Promise<void>;
  /** Количество отобранных элементов */
  elementsCount: number;
  /** Идентификаторы выбранных элементов */
  selectedItemsIds: string[];

  constructor() {
    this.filters = new SelectRequestFilters();
    this.filterStates = new SelectRequestFiltersStates();
    this.onClickSearch = async () => {
      alert("test");
    };
    this.elementsCount = 0;
    this.selectedItemsIds = [];
  }
}

/** Состояние оберток фильтров */
export class SelectRequestFiltersStates {
  /** Номер задачи */
  number: boolean;
  /** Тип */
  type: boolean;
  /** Вид */
  sort: boolean;
  /** Признак важности*/
  signImportance: boolean;
  /** Дата рождения */
  birthDate: boolean;
  /** Пол */
  gender: boolean;
  /** Телефон */
  telephone: boolean;
  /** Email */
  email: boolean;
  /** ИНН */
  inn: boolean;

  constructor() {
    this.number = false;
    this.type = false;
    this.telephone = false;
    this.inn = false;
    this.email = false;
    this.sort = false;
    this.gender = false;
    this.birthDate = false;
    this.signImportance = false;
  }
}

/** Значения фильтров формы отбора задач */
export class SelectRequestFilters implements IFiltersData {
  /** Полное наименование */
  number: StringFilter;
  /** Тип */
  type: ListFilter;
  /** Вид */
  sort: ListFilter;
  /** Признак важности */
  signImportance: ListFilter;
  /** Дата рождения */
  birthDate: DateFilter;
  /** Пол */
  gender: ListFilter;
  /** Телефон */
  telephone: StringFilter;
  /** Email */
  email: StringFilter;
  /** ИНН */
  inn: StringFilter;

  constructor() {
    this.number = new StringFilter("number", "полное наименование");
    this.type = new ListFilter("type", "тип");
    this.sort = new ListFilter("sort", "вид");
    this.signImportance = new ListFilter("signImportance", "признак важности");
    this.birthDate = new DateFilter("birthDate", "дата рождения");
    this.gender = new ListFilter("gender", "пол");
    this.telephone = new StringFilter("telephone", "телефон");
    this.email = new StringFilter("email", "email");
    this.inn = new StringFilter("inn", "ИНН");
  }

  reset() {
    this.number.reset();
    this.type.reset();
    this.sort.reset();
    this.birthDate.reset();
    this.signImportance.reset();
    this.gender.reset();
    this.telephone.reset();
    this.email.reset();
    this.inn.reset();
  }
}

export const selectRequestContext = initGlobalContext<SelectRequestData>(
  new SelectRequestData()
);
