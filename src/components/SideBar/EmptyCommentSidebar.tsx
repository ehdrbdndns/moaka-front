import React from 'react';
import Input from '../Input/Input';
import { EmptyCommentSideBarProps } from './types';

function EmptyCommentSidebar(data: EmptyCommentSideBarProps) {
  return (
    <>
      <article className="sidebar comment" ref={data.sidebarElem}>
        <div className="sidebar__content">
          <div className="sidebar__comment">
            <span className="sidebar__empty-text">
              현재 보고 있는 댓글창이 없습니다.
            </span>
            <img
              className="sidebar__empty-img"
              src="/img/chat-empty.png"
              alt="빈 이미지"
            />
          </div>
          <div className="sidebar__comment-input">
            <Input
              placeholder="답글..."
              suffix={'/img/svg/comment-input.svg'}
            ></Input>
          </div>
        </div>
      </article>
    </>
  );
}

export default EmptyCommentSidebar;
