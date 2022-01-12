import { Dispatch } from 'react';
import { initialState as ArchiveInfoList } from '../../modules/archive/types';
import { userInfo } from '../../modules/auth';
import { LinkProps } from '../Link/type';

type CardListProps = {
  title: string;
  isShow: boolean;
  archiveInfoList: ArchiveInfoList;
  archiveType: string; // top, group ...
  authInfo: userInfo;
  dispatch: Dispatch<any>;
};

type LinkListProps = {
  title: string;
  isShow: boolean;
  linktype: string; // imageview or linkview
  linkList: Array<LinkProps>;
  dispatch: Dispatch<any>;
  authInfo: userInfo;
};

export type { CardListProps, LinkListProps };
