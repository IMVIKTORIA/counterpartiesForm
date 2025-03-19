import { useEffect, useState } from "react";
import { localStorageDraftKey } from "./constants";

/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
  console.log("redirectSPA", href)
  let element = document.createElement("a");
  element.href = href;
  element.style.display = "none";
  document.querySelector("body")?.appendChild(element);
  element.click();
  element.remove();
};

/** Запись идентификатора обращения в localStorage
 * @param id Идентификатор обращения
 */
async function setRequest(id: string) {
  localStorage.setItem("currentRequestId", id);
  localStorage.setItem("currentContractorId", "");
  localStorage.setItem("currentContractorPhone", "");
}

/** Получение данных формы из черновика */
export function getDataFromDraft() {
  // Получение данных из черновика
  const draftData = localStorage.getItem(localStorageDraftKey);
  console.log(JSON.parse(draftData!));
  localStorage.removeItem(localStorageDraftKey);
  if (draftData) {
    return JSON.parse(draftData);
  }
}

export function useDebounce<ValueType = any>(
  value: ValueType,
  delay: number
): ValueType {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение)
      // после заданной задержки
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return debouncedValue;
}

export function saveState<ValueType>(state: ValueType) {
  let stateStr: string;

  try {
    stateStr = JSON.stringify(state);
  } catch (e) {
    throw new Error("Ошибка приведения состояния к строке: " + e);
  }

  localStorage.setItem(localStorageDraftKey, stateStr);
}




  /** Черновик одной задачи */
  interface TaskDraftSingle {
    /** Идентфикатор задачи */
    id?: string;
    /** Данные задачи */
    data: {[key: string]: any}
  }
  /** Черновики задач */
  type TasksDraft = {
    /** Идентификатор обращения (или "create" для режима создания) */
    [key: string]: TaskDraftSingle
  }

  /** Ключ значения черновика задач в ls */
  const TASKS_DRAFT_KEY = "medpult-tasks-draft"

  /** Получение значения черновика задачи (Одноразово) */
  export function getTaskDraft() {
    // Получение черновика {[key: string]: object}
    const lsItem = localStorage.getItem(TASKS_DRAFT_KEY);
    const draft: TasksDraft | undefined = lsItem ? JSON.parse(lsItem) : undefined;
    if(!draft) return;


    const url = new URL(window.location.href);
    const requestId = url.searchParams.get("request_id");
    const taskId = url.searchParams.get("task_id");

    // id задачи или id обращения
    const draftCode = taskId ?? requestId ?? "";
    if(!draft[draftCode]) return;
    
    // Копирование данных черновика
    let taskDraftData: TaskDraftSingle =  JSON.parse(JSON.stringify(draft[draftCode]));
    // Удаление значения из черновика
    delete draft[draftCode]
    // Записать новое значение в черновик всех задач
    localStorage.setItem(TASKS_DRAFT_KEY, JSON.stringify(draft));

    return taskDraftData;
  }

  /** Установить значение черновика */
  export function setTaskDraft(draftData: TaskDraftSingle) {
      const lsItem = localStorage.getItem(TASKS_DRAFT_KEY);
      let draft: TasksDraft | undefined = lsItem ? JSON.parse(lsItem) : undefined;
      if(!draft) draft = {};
  
      const url = new URL(window.location.href);
      const requestId = url.searchParams.get("request_id");
      
      // Записать в черновик задачи
      // id задачи или id обращения
      const draftCode = draftData.id ?? requestId ?? "";
      draft[draftCode] = draftData
  
      // Записать в черновик всех задач
      localStorage.setItem(TASKS_DRAFT_KEY, JSON.stringify(draft));
  }

export default {
  redirectSPA,
  setRequest,
  getDataFromDraft,
  saveState,
};
