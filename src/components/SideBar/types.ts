import { RefObject } from 'react';

export type LinkSideBarProps = {
  openLink: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
};

export type TreeSideBarProps = {
  openTree: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
};

export type CommentSideBarProps = {
  openComment: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
};
