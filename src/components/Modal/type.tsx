import { Dispatch, RefObject } from 'react';
import { initialState as AuthState } from '../../modules/auth';

export type LoginModalProps = {
  dispatch: Dispatch<any>;
  authInfo: AuthState;
};

export type RegisterModalProps = {
  dispatch: Dispatch<any>;
  mainModalElem: RefObject<HTMLDivElement>;
  profileModalElem: RefObject<HTMLDivElement>;
  id: string;
  pwd: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setPwd: React.Dispatch<React.SetStateAction<string>>;
  registerType: string;
  sub: string;
  profile: string;
};

export type SearchPwdModalProps = {
  mainModalElem: RefObject<HTMLDivElement>;
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

export type ThumbnailModalProps = {
  subModalElem: RefObject<HTMLDivElement>;
};

export type SubProfileModalProps = {
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
