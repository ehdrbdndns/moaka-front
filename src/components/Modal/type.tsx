import { Dispatch, RefObject } from 'react';
import { initialState as authState } from '../../modules/auth';

export type LoginModalProps = {
  dispatch: Dispatch<any>;
  authInfo: authState;
};

export type RegisterModalProps = {
  dispatch: Dispatch<any>;
  authInfo: authState;
};

export type SearchPwdModalProps = {
  subModalElem: RefObject<HTMLDivElement>;
};

export type SupportModalProps = {
  subModalElem: RefObject<HTMLDivElement>;
};

export type SettingModalProps = {
  mainModalElem: RefObject<HTMLDivElement>;
  subModalElem: RefObject<HTMLDivElement>;
};

export type WithDrawModalProps = {
  mainModalElem: RefObject<HTMLDivElement>;
  subModalElem: RefObject<HTMLDivElement>;
};

export type ProfileModalProps = {
  file: File | undefined; // 프로파일 이미지
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  subModalElem: RefObject<HTMLDivElement>;
  src: string;
  name: string;
  setName: (value: string) => void;
  nameError: string;
  setNameError: (value: string) => void;

  buttonValue: string;
  onClickButton: () => void;
};

export type LogoutModalProps = {
  mainModalElem: RefObject<HTMLDivElement>;
  subModalElem: RefObject<HTMLDivElement>;
};
