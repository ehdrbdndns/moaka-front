import { put, call, takeLatest } from 'redux-saga/effects';
import { deleteSection, makeSection } from './actions';
import * as sagaType from './types';
import * as sectionAPI from '../../apis/section/section';
import {
  deleteSectionResponseByAxios,
  makeSectionResponseByAxios,
} from '../../apis/section/types';

function* makeSectionSaga(action: ReturnType<typeof makeSection>) {
  try {
    const response: makeSectionResponseByAxios = yield call(
      sectionAPI.makeSection,
      action.payload,
    );
    if (response.isSuccess) {
      yield put({
        type: sagaType.MAKE_SECTION_SUCCESS,
      });
    } else if (response.error === 403) {
      alert('로그인 후 다시 이용해 주세요.');
      localStorage.removeItem('token');
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.MAKE_SECTION_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error.response);
    yield put({
      type: sagaType.MAKE_SECTION_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* deleteSectionSaga(action: ReturnType<typeof deleteSection>) {
  try {
    const response: deleteSectionResponseByAxios = yield call(
      sectionAPI.deleteSection,
      action.payload,
    );
    if (response.isSuccess) {
      yield put({
        type: sagaType.DELETE_SECTION_SUCCESS,
      });
    } else if (response.error === 403) {
      alert('로그인 후 다시 이용해 주세요.');
      localStorage.removeItem('token');
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.DELETE_SECTION_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error.response);
    yield put({
      type: sagaType.DELETE_SECTION_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

export function* sectionSaga() {
  yield takeLatest(sagaType.MAKE_SECTION, makeSectionSaga);
  yield takeLatest(sagaType.DELETE_SECTION, deleteSectionSaga);
}
