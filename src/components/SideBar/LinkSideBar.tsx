import React from 'react';
import Input from '../Input/Input';
import DropDown from '../DropDown/DropDown';
import Link from '../Link/Link';
import Button from '../Button/Button';
import { nanoid } from 'nanoid';
import { LinkSideBarProps } from './types';

function LinkSideBar(data: LinkSideBarProps) {
  return (
    <>
      <article className="sidebar" ref={data.sidebarElem}>
        <div className="sidebar__header">
          <h1 className="sidebar__title">링크 추가</h1>
        </div>
        <div className="sidebar__content">
          {data.openLink && (
            <>
              <Input
                prefix="/img/svg/link.svg"
                placeholder="사이트 주소 (URL)"
              ></Input>
              <Input placeholder="링크 설명"></Input>
              <DropDown defaultValue="아카이브 선택"></DropDown>
              <Link type="imageview" id={nanoid()}></Link>
              <Button value="추가하기"></Button>
            </>
          )}
        </div>
      </article>
    </>
  );
}

export default LinkSideBar;
