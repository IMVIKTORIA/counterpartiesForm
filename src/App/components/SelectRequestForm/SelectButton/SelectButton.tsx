import React from "react";
import Scripts from "../../../shared/utils/clientScripts";
import { selectRequestContext } from "../../../stores/SelectRequestContext";
import Button from "../../../../UIKit/Button/Button";
import {
  getTaskDraft,
  redirectSPA,
  setTaskDraft,
} from "../../../shared/utils/utils";

interface SelectButtonProps {
  phoneContractor?: string;
  emailContractor?: string;
}

/** Кнопка Выбрать */
export default function SelectButton({
  phoneContractor,
  emailContractor,
}: SelectButtonProps) {
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
    // Записать контрагента в черновик
    // Перейти на форму создания обращения
    window.localStorage.removeItem("medpult-draft");
    const requestId = await Scripts.createRequestForContractor(
      phone,
      selectedContractorId
    );
    const link = Scripts.getRequestPagePath();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    redirectSPA(redirectUrl.toString());

    // Перейти на рабочий стол
    //const worktable_page_code = Scripts.getWortTablePageCode();
    //redirectSPA(worktable_page_code);
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
    const tasksData = getTaskDraft();

    if (!tasksData) {
      redirectSPA(request_page_path);
      return;
    }

    tasksData.data[fieldCode] = {
      value: contractor.value,
      code: contractor.data.code,
    };

    setTaskDraft(tasksData);

    const url = new URL(window.location.href);
    const requestId = url.searchParams.get("request_id");
    const taskId = url.searchParams.get("task_id");

    const redirectUrl = new URL(
      window.location.origin + "/" + request_page_path
    );
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    if (taskId) redirectUrl.searchParams.set("task_id", taskId);
    redirectSPA(redirectUrl.toString());
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

    if (fieldId) await Scripts.assignInsured(fieldId, selectedContractorId);

    const url = new URL(window.location.href);
    const requestId = url.searchParams.get("request_id");

    const redirectUrl = new URL(
      window.location.origin + "/" + request_page_path
    );
    if (mode) {
      redirectUrl.searchParams.set("mode", mode);
    } else {
      if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    }

    redirectSPA(redirectUrl.toString());
  }

  //Выбрать контрагента для формы входящего звонка
  const getContractorIncomigCall = async () => {
    const selectedContractorId = data.selectedItemsIds[0];
    // Получить телефон
    //const phone = localStorage.getItem("medpult-call-phone");
    const phone =
      phoneContractor ||
      localStorage.getItem("medpult-call-phone") ||
      undefined;

    // Записать в контрагента новый номер телефона
    const contractorData = await Scripts.addContractorPhone(
      selectedContractorId,
      phone
    );

    const link = Scripts.getIcomingCallLink();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (phone) redirectUrl.searchParams.set("phone", phone);
    if (selectedContractorId)
      redirectUrl.searchParams.set("contractorId", selectedContractorId);
    redirectSPA(redirectUrl.toString());
  };

  //Выбрать контрагента для формы входящего письма
  const getContractorIncomigEmail = async () => {
    const selectedContractorId = data.selectedItemsIds[0];
    // Получить email
    const email = emailContractor;
    if (!email) return;

    // Записать в контрагента новый email
    const contractorData = await Scripts.addContractorEmail(
      selectedContractorId,
      email
    );

    const link = Scripts.getIcomingEmailLink();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (email) redirectUrl.searchParams.set("email", email);
    if (selectedContractorId)
      redirectUrl.searchParams.set("contractorId", selectedContractorId);
    redirectSPA(redirectUrl.toString());
  };

  // Нажатие на кнопку выбрать
  const handleSelectClick = async () => {
    const fieldId =
      new URLSearchParams(window.location.search).get("field_id") ?? "";

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
      case "select-call-contractors":
        await getContractorIncomigCall();
      case "select-email-contractors":
        await getContractorIncomigEmail();
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
