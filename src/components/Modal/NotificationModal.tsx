import React, { useRef } from 'react';
import Chat from '../Chat/Chat';
import { closeModal, toggleModal } from './event';

function NotificationModal() {
  const modalElem = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="notification-modal modal" ref={modalElem}>
        {/* modal state button */}
        <div className="modal__state" onClick={() => toggleModal(modalElem)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="modal__state-icon"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.5C12 4.36739 11.9473 4.24021 11.8536 4.14645C11.7598 4.05268 11.6326 4 11.5 4C11.3674 4 11.2402 4.05268 11.1464 4.14645C11.0527 4.24021 11 4.36739 11 4.5V6.027C9.89981 6.15001 8.88356 6.67424 8.14561 7.49946C7.40766 8.32467 6.99979 9.39295 7 10.5V16.414L5.414 18H17.586L16 16.414V10.5C16.0002 9.39295 15.5923 8.32467 14.8544 7.49946C14.1164 6.67424 13.1002 6.15001 12 6.027V4.5ZM11.5 3C11.8978 3 12.2794 3.15804 12.5607 3.43934C12.842 3.72064 13 4.10218 13 4.5V5.207C15.309 5.86 17 7.982 17 10.5V16L20 19H3L6 16V10.5C6 9.30267 6.39058 8.13802 7.11247 7.18278C7.83436 6.22754 8.84815 5.53386 10 5.207V4.5C10 4.10218 10.158 3.72064 10.4393 3.43934C10.7206 3.15804 11.1022 3 11.5 3ZM11.5 22C10.9237 22.0001 10.365 21.8011 9.91855 21.4367C9.47209 21.0722 9.16527 20.5647 9.05 20H10.085C10.1881 20.293 10.3796 20.5468 10.633 20.7263C10.8865 20.9058 11.1894 21.0022 11.5 21.0022C11.8106 21.0022 12.1135 20.9058 12.367 20.7263C12.6204 20.5468 12.8119 20.293 12.915 20H13.95C13.8347 20.5647 13.5279 21.0722 13.0815 21.4367C12.635 21.8011 12.0763 22.0001 11.5 22Z"
              fill="#616161"
            />
          </svg>
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
