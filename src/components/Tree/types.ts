import { sectionInfo } from '../../modules/section/types';

export type LinkTreeProps = {
  sectionInfoList: Array<sectionInfo>;
  openIframe: (domain: string, link: string, no: number) => void;
  iframeLinkNo: number;
};
