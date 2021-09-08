import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { getGroupArchiveListResponse } from '../../apis/archives/types';
import { getGroupArchiveList } from './actions';
import * as sagaType from './types';
import * as archiveAPI from '../../apis/archives/archives';

function* getGroupArchiveListSaga() {
  try {
    const response: getGroupArchiveListResponse = yield call(
      archiveAPI.getGroupArchiveList,
    );

    if (response.isSuccess) {
      yield put({
        type: sagaType.GET_GROUP_ARCHIVE_LIST_SUCCESS,
        payload: response.archive_list,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.GET_GROUP_ARCHIVE_LIST_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_GROUP_ARCHIVE_LIST_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

export function* archiveSaga() {
  yield takeEvery(sagaType.GET_GROUP_ARCHIVE_LIST, getGroupArchiveListSaga);
}
