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
          <input
            type="radio"
            className="mode-select__state"
            name="header-mode"
            id="mode-home"
          />
          <label className="mode-select__mode home active" htmlFor="mode-home">
            홈
          </label>
          <input
            type="radio"
            className="mode-select__state"
            name="header-mode"
            id="mode-mypage"
          />
          <label className="mode-select__mode" htmlFor="mode-mypage">
            마이페이지
          </label>
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
