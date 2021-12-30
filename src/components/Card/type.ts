import { Dispatch } from 'react';
import { archiveInfo } from '../../modules/archive/types';
import { userInfo } from '../../modules/auth';

export type CardProps = {
  dispatch: Dispatch<any>;
  archiveInfo: archiveInfo;
  authInfo: userInfo;
};
