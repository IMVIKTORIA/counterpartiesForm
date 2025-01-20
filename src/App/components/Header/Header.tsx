import React, { PropsWithChildren, useState } from "react";
import icons from "../../shared/icons";
import FilterButton from "../../../UIKit/Filters/FilterButton/FilterButton";
import { selectRequestContext } from "../../stores/SelectRequestContext";
import Button from "../../../UIKit/Button/Button";
import Scripts from "../../shared/utils/clientScripts";
import { redirectSPA } from "../../shared/utils/utils";

interface HeaderProps {
  /** Заголовок */
  title: string;
  /** Количество элементов */
  elementsCount?: number;
  /** Обработчик нажатия на кнопку Фильтры */
  clickFilterHandler?: () => void;
}

/** Шапка страницы */
function Header({
  title,
  elementsCount = 0,
  clickFilterHandler,
  children,
}: PropsWithChildren<HeaderProps>) {
  const { data, setValue } = selectRequestContext.useContext();
  /** Проверка имеются ли активные фильтры */
  const checkHasActiveFilters = (): boolean => {
    // Поиск по категориям
    if (data.filters.sort.values.length) return true;
    if (data.filters.gender.values.length) return true;
    if (data.filters.signImportance.values.length) return true;
    if (data.filters.type.values.length) return true;

    // Строковый поиск
    if (data.filters.number.value) return true;
    if (data.filters.telephone.value) return true;
    if (data.filters.email.value) return true;
    if (data.filters.inn.value) return true;

    // Поиск по датам
    if (data.filters.birthDate.valueFrom || data.filters.birthDate.valueTo)
      return true;

    return false;
  };

  const [isShowIndicator, setIsShowIndicator] = useState<boolean>(
    checkHasActiveFilters()
  );

  /** Обработчик нажатия на кнопку */
  const clickHandler = () => {
    if (clickFilterHandler) clickFilterHandler();
  };

  /** Нажатие на кнопку назад */
  const onClickReturn = () => {
    history.back();
  };

  React.useLayoutEffect(
    () => setIsShowIndicator(checkHasActiveFilters()),
    [data]
  );
  const onClickCreateContractor = () => {
    // Запись текущего url в localStorage
    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );
    // Очистить contractorId в localStorage
    window.localStorage.removeItem("medpultContractorId");

    const contractor_page_path = Scripts.getContractorPageCode();
    redirectSPA(contractor_page_path);
  };

  return (
    <div className="header">
      <div className="header__returnButton" onClick={onClickReturn}>
        {icons.ReturnButton}
      </div>
      <div className="header__filterButton">
        <FilterButton
          isShowIndicator={isShowIndicator}
          clickHandler={clickHandler}
        />
      </div>
      <div className="header__title">{title}</div>
      <div className="header__count">
        Отобрано: <span>{elementsCount}</span>
      </div>
      <div className="header__buttons">{children}</div>
      <Button
        title={"создать контрагента"}
        clickHandler={onClickCreateContractor}
      />
    </div>
  );
}

export default Header;
