import { Dispatch } from 'react';
import { archiveInfo } from '../../modules/archive/types';
import { userInfo } from '../../modules/auth';

export type CardProps = {
  dispatch: Dispatch<any>; // Redux dispatch
  archiveInfo: archiveInfo; // Redux 아카이브 정보
  authInfo: userInfo; // Redux 나의 정보
};
