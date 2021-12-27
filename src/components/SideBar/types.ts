import { Dispatch, RefObject } from 'react';
import { archiveInfo } from '../../modules/archive';
import { sectionInfo } from '../../modules/section';
import { chunkInfo } from '../../modules/section';
import { initialState as AuthInfo } from '../../modules/auth/types';
import { DirectoryResponseByAxios } from '../../apis/user/types';

export type LinkSideBarProps = {
  authInfo: AuthInfo;
  dispatch: Dispatch<any>;
  openLink: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
  closeSidebar: () => void;
  directoryList: DirectoryResponseByAxios;
};

export type EditLinkSideBarProps = {
  sidebarElem: RefObject<HTMLDivElement>;
  dispatch: Dispatch<any>;
  authInfo: AuthInfo;
  chunkInfo: chunkInfo;
  directoryList: DirectoryResponseByAxios;
};

export type TreeSideBarProps = {
  openTree: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
  sectionInfoList: Array<sectionInfo>;
};

export type CommentSideBarProps = {
  openComment: boolean;
  sidebarElem: RefObject<HTMLDivElement>;
};

export type ArchiveSideBarProps = {
  sidebarElem: RefObject<HTMLDivElement>;
  dispatch: Dispatch<any>;
  archiveInfo: archiveInfo;
  authInfo: AuthInfo;
};
