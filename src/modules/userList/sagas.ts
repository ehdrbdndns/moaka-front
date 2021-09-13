import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { searchUserListResponse } from '../../apis/user/types';
import * as sagaType from './types';
import * as userAPI from '../../apis/user/user';
import { searchUserList } from './actions';

function* searchUserListSaga(action: ReturnType<typeof searchUserList>) {
  try {
    const response: searchUserListResponse = yield call(
      userAPI.searchUserList,
      action.payload,
    );

    if (response.isSuccess) {
      yield put({
        type: sagaType.SEARCH_USERLIST_SUCCESS,
        payload: response.user_list,
      });
    } else {
      yield put({
        type: sagaType.SEARCH_USERLIST_FAILE,
        payload: '사용자 정보가 없습니다.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.SEARCH_USERLIST_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

export function* userListSaga() {
  yield takeEvery(sagaType.SEARCH_USERLIST, searchUserListSaga);
}
