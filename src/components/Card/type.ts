import { Dispatch } from 'react';
import { archiveInfo } from '../../modules/archive/types';

export type CardProps = {
  dispatch: Dispatch<any>;
  archiveInfo: archiveInfo;
};
