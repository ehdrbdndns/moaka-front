import React from 'react';
import { ThumbnailModalProps } from '../type';
import { closeSubModal } from '../event';
import Thumbnail from '../../Thumbnail/Thumbnail';
import Button from '../../Button/Button';

function ThumbnailModal(data: ThumbnailModalProps) {
  return (
    <>
      <div className="modal__view sub" ref={data.subModalElem}>
        <div className="modal__header">
          <figure className="modal__close">
            <img
              src="/img/svg/left-arrow.svg"
              alt="뒤로가기"
              data-type="profile"
              onClick={() => closeSubModal(data.subModalElem)}
            />
            <h3 className="modal__title">썸네일</h3>
          </figure>
        </div>
        <div className="modal__content">
          <div className="m-0-auto">
            <Thumbnail></Thumbnail>
          </div>
          <span className="modal__more">이미지 불러오기</span>
          <Button value="추가하기"></Button>
        </div>
      </div>
    </>
  );
}

export default ThumbnailModal;
