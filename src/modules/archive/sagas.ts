import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  deleteArchiveResponse,
  getArchiveResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBookmarkArchiveListResponse,
  getGroupArchiveListResponse,
  getTopArchiveListResponse,
  insertArchiveResponse,
  getArchiveBySearchResponse,
  getCategoryArchiveResponse,
  updateArchiveResponse,
} from '../../apis/archives/types';
import * as sagaType from './types';
import * as archiveAPI from '../../apis/archives/archives';
import * as likeAPI from '../../apis/like/like';
import * as bookmarkAPI from '../../apis/bookmark/bookmark';
import {
  archiveInfo,
  deleteArchive,
  deleteArchiveBookmark,
  deleteArchiveLike,
  getArchive,
  insertArchive,
  searchArchive,
  setArchiveBookmark,
  setArchiveLike,
  updateArchive,
} from '.';
import {
  deleteLikeResponse,
  insertLikeOfArchiveResponse,
} from '../../apis/like/types';
import {
  deleteBookmarkResponse,
  insertBookmarkOfArchiveResponse,
} from '../../apis/bookmark/types';

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

function* getBookmarkArchiveListSaga() {
  try {
    // Bookmark Archive List 가져오기
    const bookmark_archive_response: getBookmarkArchiveListResponse =
      yield call(archiveAPI.getBookmarkArchiveList);

    if (bookmark_archive_response.isSuccess) {
      yield put({
        type: sagaType.GET_BOOKMARK_ARCHIVE_LIST_SUCCESS,
        payload: bookmark_archive_response.archive_list,
      });
    } else if (bookmark_archive_response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.GET_BOOKMARK_ARCHIVE_LIST_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_BOOKMARK_ARCHIVE_LIST_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* getTopArchiveListSaga() {
  try {
    let archive_list: archiveInfo[] = [];

    // 가장 인기있는 아카이브
    const top_archive_response: getTopArchiveListResponse = yield call(
      archiveAPI.getTopArchiveList,
    );
    archive_list = archive_list.concat(top_archive_response.archive_list);

    yield put({
      type: sagaType.GET_TOP_ARCHIVE_LIST_SUCCESS,
      payload: archive_list,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_TOP_ARCHIVE_LIST_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* getCategoryArchiveListSaga() {
  try {
    let archive_list: archiveInfo[] = [];

    // 내가 관심있는 아카이브
    const category_archive_response: getCategoryArchiveResponse = yield call(
      archiveAPI.getCategoryArchiveList,
    );
    archive_list = archive_list.concat(category_archive_response.archive_list);

    yield put({
      type: sagaType.GET_CATEGORY_ARCHIVE_LIST_SUCCESS,
      payload: archive_list,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_CATEGORY_ARCHIVE_LIST_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* getHomeArchiveListSaga() {
  try {
    let archive_list: archiveInfo[] = [];

    // 가장 인기있는 아카이브
    const top_archive_response: getTopArchiveListResponse = yield call(
      archiveAPI.getTopArchiveList,
    );
    archive_list = archive_list.concat(top_archive_response.archive_list);

    yield put({
      type: sagaType.GET_HOME_ARCHIVE_LIST_SUCCESS,
      payload: archive_list,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_HOME_ARCHIVE_LIST_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* insertArchiveSaga(action: ReturnType<typeof insertArchive>) {
  try {
    const response: insertArchiveResponse = yield call(
      archiveAPI.insertArchive,
      action.payload,
    );

    if (response.isSuccess) {
      yield put({
        type: sagaType.INSERT_ARCHIVE_SUCCESS,
        payload: response.archive,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.INSERT_ARCHIVE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.INSERT_ARCHIVE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* updateArchiveSaga(action: ReturnType<typeof updateArchive>) {
  try {
    const response: updateArchiveResponse = yield call(
      archiveAPI.updateArchive,
      action.payload,
    );
    if (response.isSuccess) {
      action.payload.info.thumbnail = response.thumbnail;
      yield put({
        type: sagaType.UPDATE_ARCHIVE_SUCCESS,
        payload: action.payload.info,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.UPDATE_ARCHIVE_ERROR,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.UPDATE_ARCHIVE_ERROR,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* getArchiveSaga(action: ReturnType<typeof getArchive>) {
  try {
    const archive_list: Array<archiveInfo> = [];

    const response: getArchiveResponse = yield call(
      archiveAPI.getArchive,
      action.payload,
    );

    archive_list.push(response.archive);

    if (response.isSuccess) {
      yield put({
        type: sagaType.GET_ARCHIVE_SUCCESS,
        payload: archive_list,
      });
    } else {
      yield put({
        type: sagaType.GET_ARCHIVE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_ARCHIVE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* deleteArchiveSaga(action: ReturnType<typeof deleteArchive>) {
  try {
    const response: deleteArchiveResponse = yield call(
      archiveAPI.deleteArchive,
      action.payload,
    );
    if (response.isSuccess) {
      yield put({
        type: sagaType.DELETE_ARCHIVE_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.DELETE_ARCHIVE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.DELETE_ARCHIVE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* setLikeSaga(action: ReturnType<typeof setArchiveLike>) {
  try {
    const response: insertLikeOfArchiveResponse = yield call(
      likeAPI.insertLikeOfArchive,
      action.payload.archive_no,
    );

    if (response.isSuccess) {
      action.payload.like_no = response.like_no;
      yield put({
        type: sagaType.SET_LIKE_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.SET_LIKE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.SET_LIKE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* deleteLikeSaga(action: ReturnType<typeof deleteArchiveLike>) {
  try {
    const response: deleteLikeResponse = yield call(
      likeAPI.deleteLike,
      action.payload.like_no,
      'archive',
    );
    if (response.isSuccess) {
      action.payload.like_no = 0;
      yield put({
        type: sagaType.DELETE_LIKE_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.DELETE_LIKE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.DELETE_LIKE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* setBookmarkSaga(action: ReturnType<typeof setArchiveBookmark>) {
  try {
    const response: insertBookmarkOfArchiveResponse = yield call(
      bookmarkAPI.insertBookmarkOfArchive,
      action.payload.archive_no,
    );

    if (response.isSuccess) {
      action.payload.bookmark_no = response.bookmark_no;
      yield put({
        type: sagaType.SET_BOOKMARK_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.SET_BOOKMARK_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.DELETE_BOOKMARK_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* deleteBookmarkSaga(action: ReturnType<typeof deleteArchiveBookmark>) {
  try {
    const response: deleteBookmarkResponse = yield call(
      bookmarkAPI.deleteBookmarkOfArchive,
      action.payload.bookmark_no,
    );

    if (response.isSuccess) {
      action.payload.bookmark_no = 0;
      yield put({
        type: sagaType.DELETE_BOOKMARK_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.DELETE_BOOKMARK_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.DELETE_BOOKMARK_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* searchArchiveSaga(action: ReturnType<typeof searchArchive>) {
  try {
    const response: getArchiveBySearchResponse = yield call(
      archiveAPI.retrieveArchiveBySearch,
      action.payload,
    );
    if (response.isSuccess) {
      yield put({
        type: sagaType.SEARCH_ARCHIVE_SUCCESS,
        payload: response.archive_list,
      });
    } else {
      yield put({
        type: sagaType.SEARCH_ARCHIVE_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.SEARCH_ARCHIVE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* insertStoreArchiveSaga(action: ReturnType<typeof searchArchive>) {
  try {
    yield put({
      type: sagaType.INSERT_STORE_ARCHIVE_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.INSERT_STORE_ARCHIVE_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* resetArchiveSaga() {
  yield put({
    type: sagaType.RESET_ARCHIVE_SUCCESS,
  });
}

export function* archiveSaga() {
  yield takeEvery(sagaType.INSERT_STORE_ARCHIVE, insertStoreArchiveSaga);
  yield takeEvery(sagaType.GET_TOP_ARCHIVE_LIST, getTopArchiveListSaga);
  yield takeEvery(
    sagaType.GET_CATEGORY_ARCHIVE_LIST,
    getCategoryArchiveListSaga,
  );
  yield takeEvery(
    sagaType.GET_BOOKMARK_ARCHIVE_LIST,
    getBookmarkArchiveListSaga,
  );
  yield takeEvery(sagaType.GET_GROUP_ARCHIVE_LIST, getGroupArchiveListSaga);
  yield takeLatest(sagaType.GET_ARCHIVE, getArchiveSaga);
  yield takeLatest(sagaType.SET_LIKE, setLikeSaga);
  yield takeLatest(sagaType.DELETE_LIKE, deleteLikeSaga);
  yield takeLatest(sagaType.SET_BOOKMARK, setBookmarkSaga);
  yield takeLatest(sagaType.DELETE_BOOKMARK, deleteBookmarkSaga);
  yield takeLatest(sagaType.DELETE_ARCHIVE, deleteArchiveSaga);
  yield takeLatest(sagaType.INSERT_ARCHIVE, insertArchiveSaga);
  yield takeEvery(sagaType.SEARCH_ARCHIVE, searchArchiveSaga);
  yield takeEvery(sagaType.GET_HOME_ARCHIVE_LIST, getHomeArchiveListSaga);
  yield takeLatest(sagaType.UPDATE_ARCHIVE, updateArchiveSaga);
  yield takeEvery(sagaType.RESET_ARCHIVE, resetArchiveSaga);
}
