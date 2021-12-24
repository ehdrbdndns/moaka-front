import { Dispatch } from 'react';
import { initialState as ArchiveInfoList } from '../../modules/archive/types';
import { initialState as AuthInfo } from '../../modules/auth/types';

export type MypageProps = {
  dispatch: Dispatch<any>;
  archiveInfo: ArchiveInfoList;
  authInfo: AuthInfo;
};
