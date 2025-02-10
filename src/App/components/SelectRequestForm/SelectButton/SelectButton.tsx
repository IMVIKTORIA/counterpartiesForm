import React from "react";
import Scripts from "../../../shared/utils/clientScripts";
import { selectRequestContext } from "../../../stores/SelectRequestContext";
import Button from "../../../../UIKit/Button/Button";
import { redirectSPA } from "../../../shared/utils/utils";

interface SelectButtonProps {}

/** Кнопка Выбрать */
export default function SelectButton({}: SelectButtonProps) {
  const { data, setValue } = selectRequestContext.useContext();

  // Установить Страхователя договора
  const setTreatyPolicyHolder = async () => {
    const selectedContractorId = data.selectedItemsIds[0];
    await Scripts.setContractInsurer(selectedContractorId);

    const insurance_treaty_page_code = Scripts.getTreatyPageCode();
    redirectSPA(insurance_treaty_page_code);
  };

  // Установить ЛПУ договора
  const setTreatyLPU = async () => {
    const selectedContractorId = data.selectedItemsIds[0];
    await Scripts.setContractLPU(selectedContractorId);

    const insurance_treaty_page_code = Scripts.getTreatyPageCode();
    redirectSPA(insurance_treaty_page_code);
  };

  // Установить Ответственное лицо в строку
  const setTreatyResponsible = async () => {
    const selectedContractorId = data.selectedItemsIds[0];
    const index = new URLSearchParams(window.location.search).get("index");

    await Scripts.setContractResponsible(selectedContractorId, index);

    const insurance_treaty_page_code = Scripts.getTreatyPageCode();
    redirectSPA(insurance_treaty_page_code);
  };

  //Добавить номер телефона к контрагенту
  const assignPhone = async () => {
    const selectedContractorId = data.selectedItemsIds[0];
    // Получить телефон
    const phone = localStorage.getItem("medpult-call-phone");
    // Записать в контрагента новый номер телефона
    const contractorData = await Scripts.addContractorPhone(
      selectedContractorId,
      phone
    );
    // Перейти на рабочий стол
    const worktable_page_code = Scripts.getWortTablePageCode();
    redirectSPA(worktable_page_code);
  };

  const setTaskContractor = async (fieldId: string) => {
    // Получение выбранного контрагента из контекста
    const selectedContractorId = data.selectedItemsIds[0];
    if (!selectedContractorId) return;

    let fieldCode = "";

    switch (fieldId) {
      case "medpult-task-lpu-medical":
        fieldCode = "lpu";
        break;
      case "medpult-task-tou-medical":
        fieldCode = "tou";
        break;
    }

    // Получение ссылки на страницу обращения
    const request_page_path = Scripts.getRequestPagePath();
    // Ключ ls для черновика задачи
    const taskDraftKey = "medpult-task-draft";
    if (!fieldId) redirectSPA(request_page_path);

    // Получение даннык контрагента
    const contractor = await Scripts.getContractorById(selectedContractorId);
    const tasksDataString = localStorage.getItem(taskDraftKey);

    if (!tasksDataString) {
      redirectSPA(request_page_path);
      return;
    }

    const tasksData = JSON.parse(tasksDataString);

    tasksData.data[fieldCode] = {
      value: contractor.value,
      code: contractor.data.code,
    };

    localStorage.setItem(taskDraftKey, JSON.stringify(tasksData));

    redirectSPA(request_page_path);
  };

  /** Обработчик события нажатия на кнопку ссылки */
  async function setRequestContractor(fieldId?: string) {
    // Получение выбранного контрагента из контекста
    const selectedContractorId = data.selectedItemsIds[0];
    if (!selectedContractorId) return;
    
    // Получение ссылки на страницу обращения
    const request_page_path = Scripts.getRequestPagePath();

    const fullname = new URLSearchParams(window.location.search).get(
      "fullname"
    );
    const mode = new URLSearchParams(window.location.search).get("mode");

    if(fieldId) await Scripts.assignInsured(fieldId, selectedContractorId);

    if (mode) {
      redirectSPA(request_page_path + "?mode=" + mode);
    } else {
      redirectSPA(request_page_path);
    }
  }

  // Нажатие на кнопку выбрать
  const handleSelectClick = async () => {
    const fieldId = new URLSearchParams(window.location.search).get("field_id") ?? "";

    switch (fieldId) {
      case "medpult-task-lpu-medical":
      case "medpult-task-tou-medical":
        await setTaskContractor(fieldId);
        break;
      case "medpult-treaty-policy-holder":
        await setTreatyPolicyHolder();
        break;
      case "medpult-treaty-lpu":
        await setTreatyLPU();
        break;
      case "medpult-treaty-responsible":
        await setTreatyResponsible();
        break;
      case "medpult-worktable-call":
        await assignPhone();
        break;
      default:
        setRequestContractor(fieldId);
        break;
    }
  };

  return (
    <>
      {Boolean(data.selectedItemsIds.length) && (
        <Button
          title={"Выбрать" + `: ${data.selectedItemsIds.length}`}
          clickHandler={handleSelectClick}
        />
      )}
    </>
  );
}
