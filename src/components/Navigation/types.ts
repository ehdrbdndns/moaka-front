import { Dispatch } from 'react';
import { initialState as AuthInfo } from '../../modules/auth/types';

export type NavigationProps = {
  authInfo: AuthInfo;
  dispatch: Dispatch<any>;
  mode: string; // home or mypage or detail
};
