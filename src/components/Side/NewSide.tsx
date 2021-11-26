import React from 'react';

function NewSide() {
  return (
    <aside className="side">
      <nav className="side__nav">
        <ul>
          <li className="side__nav-item">
            <img
              src="/img/svg/archive-plus.svg"
              className="image-s"
              alt="아카이브 추가"
            />
          </li>
          <li className="side__nav-item">
            <img
              src="/img/svg/link-treeview.svg"
              className="image-s"
              alt="링크 트리 뷰"
            />
          </li>
          <li className="side__nav-item">
            <img src="/img/svg/comment.svg" className="image-s" alt="채팅" />
          </li>
          <li className="side__nav-item">
            <img src="/img/svg/clock.svg" className="image-s" alt="최근 내역" />
          </li>
          <li className="side__nav-item">
            <img
              src="/img/svg/white-heart.svg"
              className="image-s"
              alt="하트"
            />
          </li>
        </ul>
      </nav>
      <div className="side__content"></div>
    </aside>
  );
}

export default NewSide;
