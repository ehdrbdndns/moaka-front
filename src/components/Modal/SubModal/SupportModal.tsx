import React from 'react';
import { closeSubModal } from '../event';
import { SupportModalProps } from '../type';

function SupportModal(data: SupportModalProps) {
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
            <h3 className="modal__title">도움말 및 지원</h3>
          </figure>
        </div>
        <div className="modal__content">
          <ul className="modal__item-list">
            <li className="modal__item">
              <span>사이트로 이동하실 건가요?</span>
            </li>
            <li className="modal__item">
              <span>질문 모음집은 어디에 두실 건가요?</span>
            </li>
            <li className="modal__item">
              <span>기획안 주세요~!</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SupportModal;
