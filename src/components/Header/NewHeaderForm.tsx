import React from 'react';

function NewHeaderForm() {
  return (
    <header className="header">
      {/* search bar */}
      <div className="header__item  header__logo">
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
          <span className="mode-select__mode active">홈</span>
          <span className="mode-select__mode">마이페이지</span>
        </div>
      </div>
      {/* mypage */}
      <div className="header__item">
        <figure className="profile">
          <img src="/img/svg/profile.svg" alt="마이페이지" />
        </figure>
      </div>
    </header>
  );
}

export default NewHeaderForm;
