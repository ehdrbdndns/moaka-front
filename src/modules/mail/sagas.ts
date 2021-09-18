import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as sagaType from './types';
import { insertRegisterMailCode } from './actions';
import {
  expireMailCodeResponse,
  insertMailCodeOfRegisterResponse,
  isExistMailCodeResponse,
} from '../../apis/mail/types';
import * as mailAPI from '../../apis/mail/mail';
import { expireRegisterMailCode, sendRegisterMailCode } from '.';

function* insertRegisterMailCodeSaga(
  action: ReturnType<typeof insertRegisterMailCode>,
) {
  try {
    const response: insertMailCodeOfRegisterResponse = yield call(
      mailAPI.insertMailCodeOfRegister,
      action.payload.address,
    );

    action.payload.no = response.no;
    if (response.isSuccess) {
      yield put({
        type: sagaType.INSERT_REGISTER_MAILCODE_SUCCESS,
        payload: action.payload,
      });
    } else if (!response.isSuccess && response.error === 0) {
      alert('이미 존재하는 이메일입니다.');
      yield put({
        type: sagaType.INSERT_REGISTER_MAILCODE_ERROR,
        error: true,
        payload: '이미 존재하는 이메일입니다.',
      });
    } else {
      yield put({
        type: sagaType.INSERT_REGISTER_MAILCODE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.INSERT_REGISTER_MAILCODE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* expireRegisterMailCodeSaga(
  action: ReturnType<typeof expireRegisterMailCode>,
) {
  try {
    const response: expireMailCodeResponse = yield call(
      mailAPI.expireMailCode,
      action.payload,
    );

    if (response.isSuccess) {
      yield put({
        type: sagaType.EXPIRE_REGISTER_MAILCODE_SUCCESS,
      });
    } else {
      yield put({
        type: sagaType.EXPIRE_REGISTER_MAILCODE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.EXPIRE_REGISTER_MAILCODE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* sendRegisterMailCodeSaga(
  action: ReturnType<typeof sendRegisterMailCode>,
) {
  try {
    const resposne: isExistMailCodeResponse = yield call(
      mailAPI.isExistMailCode,
      action.payload.no,
      action.payload.code,
    );
    if (resposne.isSuccess) {
      yield put({
        type: sagaType.SEND_RESGISTER_MAILCODE_SUCCESS,
      });
    } else {
      alert('인증번호가 일치하지 않습니다.');
      yield put({
        type: sagaType.SEND_RESGISTER_MAILCODE_ERROR,
        error: true,
        payload: '인증번호가 일치하지 않습니다.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.SEND_RESGISTER_MAILCODE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

export function* mailSaga() {
  yield takeEvery(
    sagaType.INSERT_REGISTER_MAILCODE,
    insertRegisterMailCodeSaga,
  );
  yield takeEvery(
    sagaType.EXPIRE_REGISTER_MAILCODE,
    expireRegisterMailCodeSaga,
  );
  yield takeLatest(sagaType.SEND_RESGISTER_MAILCODE, sendRegisterMailCodeSaga);
}
