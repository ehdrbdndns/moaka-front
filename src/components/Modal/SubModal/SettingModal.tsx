import React, { useRef } from 'react';
import Toggle from '../../Toggle/Toggle';
import { closeSubModal, openSubModal } from '../event';
import { SettingModalProps } from '../type';
import SearchPwdModal from './SearchPwdModal';
import WithDrawModal from './WithDrawModal';

function SettingModal(data: SettingModalProps) {
  const searchPwdModalElem = useRef<HTMLDivElement>(null);
  const withDrawModalElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="modal__view sub" ref={data.subModalElem}>
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              onClick={() => closeSubModal(data.subModalElem)}
            />
            <h3 className="modal__title">설정 및 개인정보</h3>
          </figure>
        </div>
        <div className="modal__content">
          <ul className="modal__item-list">
            <li className="modal__item">
              <span>알림</span>
              <div className="ml-auto">
                <Toggle></Toggle>
              </div>
            </li>
            <li className="modal__item">
              <span>기본 홈페이지로 설정</span>
              <div className="ml-auto">
                <Toggle></Toggle>
              </div>
            </li>
            <li
              className="modal__item"
              onClick={() => openSubModal(searchPwdModalElem)}
            >
              <span>비밀번호 변경</span>
            </li>
            <li
              className="modal__item"
              onClick={() => openSubModal(withDrawModalElem)}
            >
              <span>회원탈퇴</span>
            </li>
          </ul>
        </div>
      </div>
      <SearchPwdModal subModalElem={searchPwdModalElem}></SearchPwdModal>
      <WithDrawModal
        mainModalElem={data.mainModalElem}
        subModalElem={withDrawModalElem}
      ></WithDrawModal>
    </>
  );
}

export default SettingModal;
