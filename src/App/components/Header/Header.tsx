import React, { PropsWithChildren, useState } from "react";
import icons from "../../shared/icons";
import FilterButton from "../../../UIKit/Filters/FilterButton/FilterButton";
import { selectRequestContext } from "../../stores/SelectRequestContext";
import Button from "../../../UIKit/Button/Button";
import Scripts from "../../shared/utils/clientScripts";
import { redirectSPA } from "../../shared/utils/utils";
import { checkHasFilters } from "../../../UIKit/shared/utils/utils";

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
    return checkHasFilters(data.filters)
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
    if(getCreateContractorButtonAccess() < 2) return;

    // Запись текущего url в localStorage
    window.localStorage.setItem(
      "medpultPathBefore",
      window.location.pathname + window.location.search
    );
    // Очистить contractorId в localStorage
    window.localStorage.removeItem("medpultContractorId");

    const currentUrl = new URL(window.location.href);

    const fieldId = currentUrl.searchParams.get("field_id")
    const requestId = currentUrl.searchParams.get("request_id")
    const mode = currentUrl.searchParams.get("mode")

    const contractor_page_path = Scripts.getContractorPageCode();
    const url = new URL(window.location.origin + "/" + contractor_page_path);

    if(fieldId) url.searchParams.set("field_id", fieldId)
    if(requestId) url.searchParams.set("request_id", requestId)
    if(mode) url.searchParams.set("mode", mode)

    redirectSPA(url.toString());
  };

  const getCreateContractorButtonAccess = () => {
    const accessSettings = Scripts.getSelectRequestAccessSettings()
    return accessSettings.createContractorButton;
  }

  return (
    <div className="header">
      <div className="header__returnButton" onClick={onClickReturn} >
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
        disabled={getCreateContractorButtonAccess() < 2}
      />
    </div>
  );
}

export default Header;
