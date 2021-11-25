import React from 'react';

function NewProfileModal() {
  const modalOnOff = () => {
    let modal = document.querySelector('.modal');
    modal?.classList.toggle('modal--active');
  };

  const modalViewChange = (e: any) => {
    const type = e.target.dataset.type;
    document
      .querySelector('.modal__view.sub.' + type)
      ?.classList.toggle('show');
  };

  const modalSubViewClose = (e: any) => {
    const type = e.target.dataset.type;
    document
      .querySelector('.modal__view.sub.' + type)
      ?.classList.remove('show');
  };

  return (
    <>
      <div className="profile-modal modal">
        {/* modal state button */}
        <figure className="modal__state" onClick={modalOnOff}>
          <img src="/img/svg/profile.svg" alt="마이페이지" />
          <div className="modal__caret"></div>
        </figure>
        {/* modal view */}
        <div className="modal__view-list">
          <div className="modal__view main">
            <div className="modal__header">
              <h3 className="modal__title">내 프로필</h3>
              <span
                className="modal__more"
                onClick={modalViewChange}
                data-type="profile"
              >
                수정
              </span>
            </div>
            <div className="modal__content">
              <div className="user-chat">
                <figure className="user-chat__profile">
                  <img src="/img/test/user-test.png" alt="사용자 이미지" />
                </figure>
                <div className="user-chat__info">
                  <div className="user-chat__name">닉네임</div>
                  <span className="user-chat__content">test@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="modal__header">
              <h3 className="modal__title">알림</h3>
              <span
                className="modal__more"
                data-type="alert"
                onClick={modalViewChange}
              >
                더보기
              </span>
            </div>
            <div className="modal__content">
              <div className="user-chat-list alert-message-list">
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
            </div>
            <div className="modal__header">
              <h3 className="modal__title">개인 설정</h3>
            </div>
            <div className="modal__content">
              <ul className="modal__item-list">
                <li
                  className="modal__item"
                  data-type="setting"
                  onClick={modalViewChange}
                >
                  <img src="/img/svg/setting.svg" alt="톱니바퀴" />
                  <span>설정 및 개인정보</span>
                </li>
                <li className="modal__item">
                  <img src="/img/svg/help.svg" alt="물음표" />
                  <span>도움말 및 지원</span>
                </li>
                <li className="modal__item">
                  <img src="/img/svg/logout.svg" alt="로그아웃" />
                  <span>로그아웃</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="modal__view sub profile">
            <div className="modal__header">
              <figure className="modal__close">
                <img
                  src="/img/svg/left-arrow.svg"
                  alt="뒤로가기"
                  data-type="profile"
                  onClick={modalSubViewClose}
                />
                <h3 className="modal__title">프로필 수정</h3>
              </figure>
            </div>
            <div className="modal__content">
              <figure className="modal__profile-img">
                <img
                  src="/img/test/user-test.png"
                  className="image-xl"
                  alt="사용자 이미지"
                />
                <span className="modal__more">수정</span>
              </figure>
              <div className="modal__input input-box">
                <input type="text" placeholder="닉네임" />
              </div>
              <div className="button">저장</div>
            </div>
          </div>
          <div className="modal__view sub alert">
            <div className="modal__header">
              <figure className="modal__close">
                <img
                  src="/img/svg/left-arrow.svg"
                  alt="뒤로가기"
                  data-type="alert"
                  onClick={modalSubViewClose}
                />
                <h3 className="modal__title">알림</h3>
              </figure>
            </div>
          </div>
          <div className="modal__view sub setting">
            <div className="modal__header">
              <figure className="modal__close">
                <img
                  src="/img/svg/left-arrow.svg"
                  alt="뒤로가기"
                  data-type="setting"
                  onClick={modalSubViewClose}
                />
                <h3 className="modal__title">설정 및 개인정보</h3>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewProfileModal;
