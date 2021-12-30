import { Dispatch, RefObject } from 'react';
import { alarmInfo } from '../../apis/alarm/types';
import { initialState as AuthState } from '../../modules/auth';

export type AddArchiveModalProps = {
  dispatch: Dispatch<any>;
  authInfo: AuthState;
};

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

export type ChangePwdModalProps = {
  mainModalElem: RefObject<HTMLDivElement>;
  subModalElem: RefObject<HTMLDivElement>;
  id: string;
};

export type SupportModalProps = {
  subModalElem: RefObject<HTMLDivElement>;
};

export type SettingModalProps = {
  dispatch: Dispatch<any>;
  mainModalElem: RefObject<HTMLDivElement>;
  subModalElem: RefObject<HTMLDivElement>;
  id: string;
};

export type WithDrawModalProps = {
  dispatch: Dispatch<any>;
  mainModalElem: RefObject<HTMLDivElement>;
  subModalElem: RefObject<HTMLDivElement>;
  id: string;
};

export type ThumbnailModalProps = {
  subModalElem: RefObject<HTMLDivElement>;
  imgSrc: string;
  setImgSrc: (src: string) => void;
  setImgFile: (file: File) => void;
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

export type ChangeProfileModalProps = {
  subModalElem: RefObject<HTMLDivElement>;
  src: string;
  name: string;
};

export type LogoutModalProps = {
  mainModalElem: RefObject<HTMLDivElement>;
  subModalElem: RefObject<HTMLDivElement>;
};

export type ProfileModalProps = {
  dispatch: Dispatch<any>;
  authInfo: AuthState;
};

export type NotificationModalProps = {
  alarmList: Array<alarmInfo>;
};
