import React from 'react';
import NewProfileModal from '../Modal/NewProfileModal';

function NewHeaderForm() {
  return (
    <>
      <header className="header">
        {/* search bar */}
        <div className="header__item header__logo">
          <img src="/img/logo/logo.png" alt="logo" className="logo" />
          <div className="search-input-box input-box">
            <img
              src="/img/logo/white-google-logo.png"
              alt=""
              className="prefix"
            />
            <input type="text" placeholder="구글 검색" />
          </div>
        </div>
        {/* mode select */}
        <div className="header__item">
          <div className="mode-select">
            <div className="mode-select__mode mode-select__mode--active home">
              홈
            </div>
            <div className="mode-select__mode mypage">마이페이지</div>
          </div>
        </div>
        {/* mypage */}
        <div className="header__item header__profile">
          <NewProfileModal />
        </div>
      </header>
    </>
  );
}

export default NewHeaderForm;
