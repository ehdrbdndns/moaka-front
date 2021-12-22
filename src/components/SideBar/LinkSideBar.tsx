import React, { useState } from 'react';
import Input from '../Input/Input';
import DropDown from '../DropDown/DropDown';
import Link from '../Link/Link';
import Button from '../Button/Button';
import { nanoid } from 'nanoid';
import { LinkSideBarProps } from './types';
import SidebarSkeleton from '../Skeleton/SidebarSkeleton';

function LinkSideBar(data: LinkSideBarProps) {
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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
                value={link}
                setValue={setLink}
                prefix="/img/svg/link.svg"
                placeholder="사이트 주소 (URL)"
              ></Input>
              <Input
                placeholder="링크 설명"
                value={description}
                setValue={setDescription}
              ></Input>
              <DropDown defaultValue="아카이브 선택"></DropDown>
              <div className="m-0-auto">
                <Link type="imageview" id={nanoid()}></Link>
              </div>
              <Button value="추가하기"></Button>
            </>
          )}
        </div>
      </article>
    </>
  );
}

export default LinkSideBar;
