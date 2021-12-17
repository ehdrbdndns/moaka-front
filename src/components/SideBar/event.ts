import { Dispatch, RefObject } from 'react';

const setCommentMaxHeight = (
  sidebar: RefObject<HTMLDivElement>,
  header: RefObject<HTMLDivElement>,
  link: RefObject<HTMLDivElement>,
  commentInput: RefObject<HTMLDivElement>,
  setCommentHeight: Dispatch<React.SetStateAction<string>>,
) => {
  let totalHeight = sidebar.current?.clientHeight as number;
  let headerHeight = header.current?.clientHeight as number;
  let linkHeight = link.current?.clientHeight as number;
  let commentInputHeight = commentInput.current?.clientHeight as number;
  let divHeight = 32;

  console.log('totalHeight: ' + totalHeight);
  console.log(headerHeight);
  console.log(linkHeight);
  console.log(commentInputHeight);

  console.log(
    totalHeight -
      (headerHeight + linkHeight + divHeight + commentInputHeight) +
      'px',
  );

  setCommentHeight(
    totalHeight -
      (headerHeight + linkHeight + divHeight + commentInputHeight) +
      'px',
  );
};

export { setCommentMaxHeight };
