import { RefObject } from 'react';

export type LinkSideBarProps = {
  sidebarElem: RefObject<HTMLDivElement>;
};

export type TreeSideBarProps = {
  sidebarElem: RefObject<HTMLDivElement>;
};

export type CommentSideBarProps = {
  openComment: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
};
