import React from 'react';

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
          {/* modal */}
          <div className="profile-modal modal">
            {/* modal state button */}
            <figure className="profile-modal__state">
              <img src="/img/svg/profile.svg" alt="마이페이지" />
            </figure>
            {/* modal view */}
            <div className="profile-modal__view">
              <div className="profile-modal__caret"></div>
              <div className="profile-modal__header">
                <span className="profile-modal__title">내 프로필</span>
                <button className="profile-modal__more">수정</button>
              </div>
              <div className="profile-modal__content">
                <div className="user-chat">
                  <figure className="user-chat__profile">
                    <img src="/img/test/user-test.png" alt="사용자 이미지" />
                  </figure>
                  <div className="user-chat__info">
                    <span className="user-chat__name">닉네임</span>
                    <span className="user-chat__content">test@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="profile-modal__header">
                <span className="profile-modal__title">알림</span>
                <button className="profile-modal__more">더보기</button>
              </div>
              <div className="profile-modal__content">
                <div className="user-chat">
                  <figure className="user-chat__profile">
                    <img src="/img/test/user-test.png" alt="사용자 이미지" />
                  </figure>
                  <div className="user-chat__info">
                    <span className="user-chat__content">
                      <strong>닉네임</strong>님이 회원님의
                      <strong>아카이브제목/링크제목</strong>을 좋아합니다.
                    </span>
                  </div>
                  <div className="user-chat__rest">
                    <span className="user-chat__time">N시간</span>
                  </div>
                </div>
                <div className="user-chat">
                  <figure className="user-chat__profile">
                    <img src="/img/test/user-test.png" alt="사용자 이미지" />
                  </figure>
                  <div className="user-chat__info">
                    <span className="user-chat__content">
                      <strong>닉네임</strong>님이 회원님의
                      <strong>아카이브제목/링크제목</strong>을 좋아합니다.
                    </span>
                  </div>
                  <div className="user-chat__rest">
                    <span className="user-chat__time">N시간</span>
                  </div>
                </div>
                <div className="user-chat">
                  <figure className="user-chat__profile">
                    <img src="/img/test/user-test.png" alt="사용자 이미지" />
                  </figure>
                  <div className="user-chat__info">
                    <span className="user-chat__content">
                      <strong>닉네임</strong>님이 회원님의
                      <strong>아카이브제목/링크제목</strong>을 좋아합니다.
                    </span>
                  </div>
                  <div className="user-chat__rest">
                    <span className="user-chat__time">N시간</span>
                  </div>
                </div>
              </div>
              <div className="profile-modal__content">
                <ul className="profile-modal__item-list">
                  <li className="profile-modal__item">
                    <img src="/img/svg/setting.svg" alt="톱니바퀴" />
                    <span>설정 및 개인정보</span>
                  </li>
                  <li className="profile-modal__item">
                    <img src="/img/svg/help.svg" alt="물음표" />
                    <span>도움말 및 지원</span>
                  </li>
                  <li className="profile-modal__item">
                    <img src="/img/svg/logout.svg" alt="로그아웃" />
                    <span>로그아웃</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NewHeaderForm;
