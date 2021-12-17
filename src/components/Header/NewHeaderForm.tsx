import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NewProfileModal from '../Modal/ProfileModal';

function NewHeaderForm() {
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document
        .querySelector('.mode-select__mode.home')
        ?.classList.add('mode-select__mode--active');
      document
        .querySelector('.mode-select__mode.mypage')
        ?.classList.remove('mode-select__mode--active');
    } else {
      document
        .querySelector('.mode-select__mode.mypage')
        ?.classList.add('mode-select__mode--active');
      document
        .querySelector('.mode-select__mode.home')
        ?.classList.remove('mode-select__mode--active');
    }
  }, [location]);

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
            <Link to="/">
              <div className="mode-select__mode home">홈</div>
            </Link>
            <Link to="/mypage">
              <div className="mode-select__mode mypage">마이페이지</div>
            </Link>
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
