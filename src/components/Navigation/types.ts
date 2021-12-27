import { Dispatch } from 'react';
import { archiveInfo } from '../../modules/archive';
import { sectionInfo } from '../../modules/section/types';
import { chunkInfo } from '../../modules/section';
import { initialState as AuthInfo } from '../../modules/auth/types';

export type NavigationProps = {
  archiveInfo: archiveInfo | null;
  sectionInfo: Array<sectionInfo> | null;
  chunkInfo: chunkInfo | null;
  authInfo: AuthInfo;
  dispatch: Dispatch<any>;
  mode: string; // home or mypage or detail
};
