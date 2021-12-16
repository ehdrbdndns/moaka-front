import React from 'react';
import { CommentSideBarProps } from './types';

function CommentSidebar(data: CommentSideBarProps) {
  return (
    <>
      <article className="sidebar" ref={data.sidebarElem}>
        <h1 className="sidebar__title">댓글</h1>
        <div className="sidebar__content"></div>
      </article>
    </>
  );
}

export default CommentSidebar;
