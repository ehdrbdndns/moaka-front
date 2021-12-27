import { RefObject } from 'react';

export type IframeProps = {
  elem: RefObject<HTMLDivElement>;
  title: string;
  url: string;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};
