import React from 'react';
import { useHistory } from 'react-router';
import { closeModal, closeSubModal } from '../event';
import { LogoutModalProps } from '../type';
import Button from '../../Button/Button';

function LogoutModal(data: LogoutModalProps) {
  const { push } = useHistory();

  const closeAllModal = () => {
    closeModal(data.mainModalElem);
    closeSubModal(data.subModalElem);
  };

  return (
    <>
      <div className="modal__view sub modal-login" ref={data.subModalElem}>
        <div className="modal__header">
          <figure className="modal__logo">
            <img src="/img/logo/logo.png" alt="로고" />
          </figure>
          <h3 className="modal__title">로그아웃 되었습니다.</h3>
        </div>
        <div className="modal__content px-pt-0">
          <Button value="홈" onClick={closeAllModal} />
        </div>
        <div className="modal__footer">
          <span></span>
          <span
            onClick={() => {
              push('/');
            }}
          >
            ©Moaca
          </span>
        </div>
      </div>
    </>
  );
}

export default LogoutModal;
