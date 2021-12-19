import React, { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Chat from '../Chat/Chat';
import LinkBox from '../Link/LinkBox';
import Input from '../Input/Input';
import { CommentSideBarProps } from './types';
import { initialCommentSidebarEvent, resetCommentVariableEvent } from './event';

function CommentSidebar(data: CommentSideBarProps) {
  const commentElem = useRef<HTMLDivElement>(null);
  const linkElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.openComment) {
      initialCommentSidebarEvent(commentElem, linkElem);
    } else {
      resetCommentVariableEvent();
    }
  }, [data.sidebarElem, data.openComment]);

  return (
    <>
      <article className="sidebar comment" ref={data.sidebarElem}>
        <div className="sidebar__header">
          <h1 className="sidebar__title">댓글</h1>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.25 18.4395L7.9395 15.75H16.5C16.8978 15.75 17.2794 15.592 17.5607 15.3107C17.842 15.0294 18 14.6478 18 14.25V7.5C18 7.10218 17.842 6.72064 17.5607 6.43934C17.2794 6.15804 16.8978 6 16.5 6H6.75C6.35218 6 5.97064 6.15804 5.68934 6.43934C5.40804 6.72064 5.25 7.10218 5.25 7.5V18.4395ZM5.25 19.5H4.5V7.5C4.5 6.90326 4.73705 6.33097 5.15901 5.90901C5.58097 5.48705 6.15326 5.25 6.75 5.25H16.5C17.0967 5.25 17.669 5.48705 18.091 5.90901C18.5129 6.33097 18.75 6.90326 18.75 7.5V14.25C18.75 14.8467 18.5129 15.419 18.091 15.841C17.669 16.2629 17.0967 16.5 16.5 16.5H8.25L5.25 19.5ZM7.875 9.75C8.17337 9.75 8.45952 9.86853 8.6705 10.0795C8.88147 10.2905 9 10.5766 9 10.875C9 11.1734 8.88147 11.4595 8.6705 11.6705C8.45952 11.8815 8.17337 12 7.875 12C7.57663 12 7.29048 11.8815 7.0795 11.6705C6.86853 11.4595 6.75 11.1734 6.75 10.875C6.75 10.5766 6.86853 10.2905 7.0795 10.0795C7.29048 9.86853 7.57663 9.75 7.875 9.75V9.75ZM7.875 10.5C7.77554 10.5 7.68016 10.5395 7.60984 10.6098C7.53951 10.6802 7.5 10.7755 7.5 10.875C7.5 10.9745 7.53951 11.0698 7.60984 11.1402C7.68016 11.2105 7.77554 11.25 7.875 11.25C7.97446 11.25 8.06984 11.2105 8.14016 11.1402C8.21049 11.0698 8.25 10.9745 8.25 10.875C8.25 10.7755 8.21049 10.6802 8.14016 10.6098C8.06984 10.5395 7.97446 10.5 7.875 10.5ZM11.625 9.75C11.9234 9.75 12.2095 9.86853 12.4205 10.0795C12.6315 10.2905 12.75 10.5766 12.75 10.875C12.75 11.1734 12.6315 11.4595 12.4205 11.6705C12.2095 11.8815 11.9234 12 11.625 12C11.3266 12 11.0405 11.8815 10.8295 11.6705C10.6185 11.4595 10.5 11.1734 10.5 10.875C10.5 10.5766 10.6185 10.2905 10.8295 10.0795C11.0405 9.86853 11.3266 9.75 11.625 9.75ZM11.625 10.5C11.5255 10.5 11.4302 10.5395 11.3598 10.6098C11.2895 10.6802 11.25 10.7755 11.25 10.875C11.25 10.9745 11.2895 11.0698 11.3598 11.1402C11.4302 11.2105 11.5255 11.25 11.625 11.25C11.7245 11.25 11.8198 11.2105 11.8902 11.1402C11.9605 11.0698 12 10.9745 12 10.875C12 10.7755 11.9605 10.6802 11.8902 10.6098C11.8198 10.5395 11.7245 10.5 11.625 10.5ZM15.375 9.75C15.6734 9.75 15.9595 9.86853 16.1705 10.0795C16.3815 10.2905 16.5 10.5766 16.5 10.875C16.5 11.1734 16.3815 11.4595 16.1705 11.6705C15.9595 11.8815 15.6734 12 15.375 12C15.0766 12 14.7905 11.8815 14.5795 11.6705C14.3685 11.4595 14.25 11.1734 14.25 10.875C14.25 10.5766 14.3685 10.2905 14.5795 10.0795C14.7905 9.86853 15.0766 9.75 15.375 9.75ZM15.375 10.5C15.2755 10.5 15.1802 10.5395 15.1098 10.6098C15.0395 10.6802 15 10.7755 15 10.875C15 10.9745 15.0395 11.0698 15.1098 11.1402C15.1802 11.2105 15.2755 11.25 15.375 11.25C15.4745 11.25 15.5698 11.2105 15.6402 11.1402C15.7105 11.0698 15.75 10.9745 15.75 10.875C15.75 10.7755 15.7105 10.6802 15.6402 10.6098C15.5698 10.5395 15.4745 10.5 15.375 10.5Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="sidebar__content">
          {data.openComment && (
            <div className="sidebar__comment" ref={commentElem}>
              <div className="sidebar__link" ref={linkElem}>
                <div className="px-p-8">
                  <LinkBox id={nanoid()}></LinkBox>
                </div>
                <div className="sidebar__div" />
              </div>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true}></Chat>
              <Chat isTimeShow={true} isLikeShow={true} isMine={true}></Chat>
            </div>
          )}
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

export default CommentSidebar;
