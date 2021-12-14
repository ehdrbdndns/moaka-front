import React, { useRef } from 'react';
import { nanoid } from 'nanoid';
import { onClickDropdown, selectDropdownItem } from './event';
import { DropDownProps, DropwDownListType } from './type';

function DropDown(data: DropDownProps) {
  const dropdownElem = useRef<HTMLDivElement>(null);
  const dropdownStateElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="dropdown" ref={dropdownElem}>
        <div
          className="dropdown__state"
          onClick={() => onClickDropdown(dropdownElem)}
        >
          <span ref={dropdownStateElem}>{data.defaultValue}</span>
          <img
            className="dropdown__state-icon"
            src="/img/svg/up-arrow.svg"
            alt="화살표"
          />
        </div>
        <div className="dropdown__content">
          {data.dropdownList.map(dropdown => (
            <div key={nanoid()}>
              <h1 className="dropdown__title">{dropdown.title}</h1>
              <ul className="dropdown__list">
                {dropdown.list.map(item => (
                  <li
                    key={nanoid()}
                    className="dropdown__list-item"
                    onClick={() =>
                      selectDropdownItem(
                        item.no,
                        item.title,
                        data.setValue,
                        dropdownElem,
                        dropdownStateElem,
                      )
                    }
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

DropDown.defaultProps = {
  defaultValue: 'dropdown', // 기본 select 값
  setValue: () => {},
  dropdownList: [
    {
      title: '아카이브 제목',
      list: [
        {
          no: 0,
          title: '타이틀1',
        },
      ],
    } as DropwDownListType,
  ],
};

export default DropDown;
