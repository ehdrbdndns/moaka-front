import { Dispatch, RefObject } from 'react';
import { initialState as AuthInfo } from '../../modules/auth/types';

export type LinkSideBarProps = {
  authInfo: AuthInfo;
  dispatch: Dispatch<any>;
  openLink: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
  closeSidebar: () => void;
};

export type TreeSideBarProps = {
  openTree: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
};

export type CommentSideBarProps = {
  openComment: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
};
