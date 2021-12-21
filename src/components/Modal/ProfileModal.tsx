import React, { useRef, useState } from 'react';
import Chat from '../Chat/Chat';
import Profile from '../Profile/Profile';
import { closeModal, openSubModal, toggleModal } from './event';
import LogoutModal from './SubModal/LogoutModal';
import SubProfileModal from './SubModal/SubProfileModal';
import SettingModal from './SubModal/SettingModal';
import SupportModal from './SubModal/SupportModal';
import { ProfileModalProps } from './type';
import { getLogout } from '../../modules/auth';

function ProfileModal(data: ProfileModalProps) {
  const modalElem = useRef<HTMLDivElement>(null);
  const profileModalElem = useRef<HTMLDivElement>(null);
  const settingModalElem = useRef<HTMLDivElement>(null);
  const supportModalElem = useRef<HTMLDivElement>(null);
  const logoutModalElem = useRef<HTMLDivElement>(null);

  // Profile Modal
  const [profileFile, setProfileFile] = useState<File>();
  const [profileName, setProfileName] = useState<string>('');
  const [profileNameError, setProfileNameError] = useState<string>('');

  const logoutEvent = () => {
    data.dispatch(getLogout());
    openSubModal(logoutModalElem);
  };

  return (
    <>
      <div className="profile-modal modal" ref={modalElem}>
        {/* modal state button */}
        <div className="modal__state" onClick={() => toggleModal(modalElem)}>
          <Profile src={data.authInfo.data.profile} size="s"></Profile>
        </div>
        {/* modal view */}
        <div className="modal__view-list">
          <div className="modal__view main">
            <div className="modal__header">
              <h3 className="modal__title">내 프로필</h3>
              <span
                className="modal__more"
                onClick={() => openSubModal(profileModalElem)}
              >
                수정
              </span>
            </div>
            <div className="modal__content">
              <Chat
                profileSrc={data.authInfo.data.profile}
                name={data.authInfo.data.name}
                description={data.authInfo.data.id}
              ></Chat>
            </div>
            <div className="modal__header">
              <h3 className="modal__title">개인 설정</h3>
            </div>
            <div className="modal__content">
              <ul className="modal__item-list">
                <li
                  className="modal__item"
                  onClick={() => openSubModal(settingModalElem)}
                >
                  <img src="/img/svg/setting.svg" alt="톱니바퀴" />
                  <span>설정 및 개인정보</span>
                </li>
                <li
                  className="modal__item"
                  onClick={() => openSubModal(supportModalElem)}
                >
                  <img src="/img/svg/help.svg" alt="물음표" />
                  <span>도움말 및 지원</span>
                </li>
                <li className="modal__item" onClick={logoutEvent}>
                  <img src="/img/svg/logout.svg" alt="로그아웃" />
                  <span>로그아웃</span>
                </li>
              </ul>
            </div>
          </div>
          <SubProfileModal
            src={'/img/user/user-default-img.png'}
            file={profileFile}
            setFile={setProfileFile}
            subModalElem={profileModalElem}
            name={profileName}
            setName={setProfileName}
            nameError={profileNameError}
            setNameError={setProfileNameError}
            buttonValue={'저장'}
          ></SubProfileModal>
          <SettingModal
            dispatch={data.dispatch}
            mainModalElem={modalElem}
            subModalElem={settingModalElem}
            id={data.authInfo.data.id}
          ></SettingModal>
          <SupportModal subModalElem={supportModalElem}></SupportModal>
          <LogoutModal
            mainModalElem={modalElem}
            subModalElem={logoutModalElem}
          ></LogoutModal>
        </div>
      </div>
      {/* modal background */}
      <div
        className="modal__background"
        onClick={() => closeModal(modalElem)}
      ></div>
    </>
  );
}

export default ProfileModal;
