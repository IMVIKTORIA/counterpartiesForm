import {
  ItemData,
  ItemDataString,
} from "../../UIKit/CustomList/CustomListTypes";

export interface IInputData<DataType = any> {
  value: string;
  data?: DataType;
}

export class SelectRequestData {
  /** Номер обращения */
  number?: ItemData;
  /** Статус */
  type?: ItemData;
  /** Канал */
  sort?: ItemData;
  /** Канал(Ручной ввод) */
  signImportance?: ItemData;
  /** Дата создания */
  birthDate?: ItemDataString;
  /** Обратившийся */
  gender?: ItemData;
  /** Застрахованный */
  telephone?: ItemData;
  /** Статус ЗЛ */
  email?: ItemData;
  /** Полис */
  inn?: ItemData;
  /** Получен по интеграции */
  isIntegration?: ItemData<boolean>;

  constructor({
    number,
    type,
    sort,
    signImportance,
    birthDate,
    gender,
    telephone,
    email,
    inn,
    isIntegration,
  }: SelectRequestData) {
    this.number = number;
    this.type = type;
    this.sort = sort;
    this.signImportance = signImportance;
    this.birthDate = birthDate;
    this.gender = gender;
    this.telephone = telephone;
    this.email = email;
    this.inn = inn;
    this.isIntegration = isIntegration;
  }
}
