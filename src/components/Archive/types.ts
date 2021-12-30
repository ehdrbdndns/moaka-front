import { Dispatch } from 'react';
import { initialState as ArchiveInfoList } from '../../modules/archive/types';
import { initialState as AuthInfo } from '../../modules/auth/types';
import { initialState as SectionInfo } from '../../modules/section/types';

export type ArchiveDetailProps = {
  dispatch: Dispatch<any>;
  archiveInfo: ArchiveInfoList;
  sectionInfo: SectionInfo;
  authInfo: AuthInfo;
};

export {};
