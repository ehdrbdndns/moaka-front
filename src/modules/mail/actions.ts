import { mailState } from '.';
import * as sagaType from './types';

// TODO 액션 함수
export const insertRegisterMailCode = (mailState: mailState) => ({
  type: sagaType.INSERT_REGISTER_MAILCODE,
  payload: mailState,
});

export const expireRegisterMailCode = (mail_no: number) => ({
  type: sagaType.EXPIRE_REGISTER_MAILCODE,
  payload: mail_no,
});

export const sendRegisterMailCode = (mailState: mailState) => ({
  type: sagaType.SEND_RESGISTER_MAILCODE,
  payload: mailState,
});
