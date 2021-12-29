import { Dispatch } from 'react';
import { archiveInfo } from '../../modules/archive';
import { sectionInfo } from '../../modules/section/types';
import { chunkInfo } from '../../modules/section';
import { initialState as AuthInfo } from '../../modules/auth/types';
import { chatInfo } from '../../apis/chat/types';

export type NavigationProps = {
  archiveInfo: archiveInfo | null;
  sectionInfo: Array<sectionInfo> | null;
  chunkInfo: chunkInfo | null;
  chatList: Array<chatInfo>;
  authInfo: AuthInfo;
  dispatch: Dispatch<any>;
  mode: string; // home or mypage or detail
  openSidebar: string; // archive or edit or chat
  openIframe: (domain: string, link: string, no: number) => void;
  iframeLinkNo: number;
};
