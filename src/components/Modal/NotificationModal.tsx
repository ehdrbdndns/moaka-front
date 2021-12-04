import React, { useRef } from 'react';
import Chat from '../Chat/Chat';
import { closeModal, toggleModal } from './event';

function NotificationModal() {
  const modalElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="archive-modal modal" ref={modalElem}>
        {/* modal state button */}
        <div className="modal__state" onClick={() => toggleModal(modalElem)}>
          <img src="/img/svg/notification.svg" alt="알람" />
        </div>
        {/* modal view */}
        <div className="modal__view-list">
          <div className="modal__view main">
            <div className="modal__header">
              <h3 className="modal__title">알림</h3>
            </div>
            <div className="modal__content">
              <Chat
                isTimeShow={true}
                name="닉네임"
                description="(아카이브제목/링크제목)을 좋아합니다."
              />
              <Chat
                isTimeShow={true}
                name="닉네임"
                description="(아카이브제목/링크제목)을 좋아합니다."
              />
              <Chat
                isTimeShow={true}
                name="닉네임"
                description="(아카이브제목/링크제목)을 좋아합니다."
              />
              <Chat
                isTimeShow={true}
                name="닉네임"
                description="(아카이브제목/링크제목)을 좋아합니다."
              />
            </div>
          </div>
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

export default NotificationModal;
