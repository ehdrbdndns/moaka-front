import { Dispatch } from 'react';
import { initialState as ArchiveInfoList } from '../../modules/archive/types';

export type HomeProps = {
  dispatch: Dispatch<any>;
  archive_info: ArchiveInfoList;
};
