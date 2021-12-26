import { Dispatch } from 'react';
import { archiveInfo } from '../../modules/archive';
import { initialState as AuthInfo } from '../../modules/auth/types';

export type NavigationProps = {
  archiveInfo: archiveInfo | null;
  authInfo: AuthInfo;
  dispatch: Dispatch<any>;
  mode: string; // home or mypage or detail
};
