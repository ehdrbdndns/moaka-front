import React from 'react';

let prevScrollTop = 0;
let currentScrollTop = 0;

const initialCommentSidebarEvent = (
  commentElem: React.RefObject<HTMLDivElement>,
  linkElem: React.RefObject<HTMLDivElement>,
) => {
  // sidebar scroll 맨 아래로 내리기
  const element = commentElem.current as HTMLDivElement;
  const scrollHeight = element.scrollHeight as number;
  const clientHeight = element.clientHeight as number;
  console.log(scrollHeight);
  console.log(clientHeight);

  element.scrollTop = scrollHeight - clientHeight;
  prevScrollTop = element.scrollTop;

  console.log('initail');

  // scrollEvent 설정
  element.addEventListener('scroll', e => {
    commentScrollEvent(e, linkElem);
  });
};

const commentScrollEvent = (
  e: any,
  LinkElem: React.RefObject<HTMLDivElement>,
) => {
  currentScrollTop = e.target.scrollTop;

  console.log('prev: ' + prevScrollTop);
  console.log('current: ' + currentScrollTop);

  switch (currentScrollTop < prevScrollTop) {
    case true:
      // hide link
      console.log('hide');

      hideLink(LinkElem);
      break;
    case false:
      // show link
      console.log('show');
      showLink(LinkElem);
      break;
    default:
      break;
  }

  prevScrollTop = currentScrollTop;
};

const hideLink = (LinkElem: React.RefObject<HTMLDivElement>) => {
  LinkElem.current?.classList.remove('show');
  LinkElem.current?.classList.add('hide');
};

const showLink = (LinkElem: React.RefObject<HTMLDivElement>) => {
  LinkElem.current?.classList.remove('hide');
  LinkElem.current?.classList.add('show');
};

export { commentScrollEvent, initialCommentSidebarEvent };
