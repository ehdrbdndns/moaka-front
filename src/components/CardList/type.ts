import { Dispatch } from 'react';
import { initialState as ArchiveInfoList } from '../../modules/archive/types';
import { LinkProps } from '../Link/type';

type CardListProps = {
  title: string;
  isShow: boolean;
  archiveInfoList: ArchiveInfoList;
  archiveType: string; // top, group ...
  dispatch: Dispatch<any>;
};

type LinkListProps = {
  title: string;
  isShow: boolean;
  linktype: string;
  linkList: Array<LinkProps>;
};

export type { CardListProps, LinkListProps };
