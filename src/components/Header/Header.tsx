import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import AddArchiveModal from '../Modal/AddArchiveModal';
import LoginModal from '../Modal/LoginModal';
import NotificationModal from '../Modal/NotificationModal';
import Tab from '../Tab/Tab';

function Header() {
  const { push } = useHistory();

  const [headerActiveTab, setHeaderActiveTab] = useState<string>('first');

  const headerFirstTabClick = () => {
    push('/');
    setHeaderActiveTab('first');
  };

  const headerSecondTabClick = () => {
    push('/mypage');
    setHeaderActiveTab('second');
  };

  return (
    <>
      <header className="header">
        <img
          src="/img/svg/logo.svg"
          className="header__logo"
          alt="로고 이미지"
        />
        <div className="m-0-auto">
          <Tab
            firstName="탐색하기"
            secondName="나의 저장소"
            firstId={nanoid()}
            secondId={nanoid()}
            onClickOfFirst={headerFirstTabClick}
            onClickOfSecond={headerSecondTabClick}
            activeMode={headerActiveTab}
          ></Tab>
        </div>
        <div className="header__item-list">
          <div className="header__item">
            <NotificationModal></NotificationModal>
          </div>
          <div className="header__item">
            <AddArchiveModal></AddArchiveModal>
          </div>
          <div className="header__item">
            <LoginModal></LoginModal>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
