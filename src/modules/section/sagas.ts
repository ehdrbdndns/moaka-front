import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  deleteChunk,
  deleteSection,
  updateChunk,
  getSection,
  makeChunk,
  makeSection,
  updateSection,
  setBookmark,
  deleteBookmark,
  setLike,
} from './actions';
import * as sagaType from './types';
import * as sectionAPI from '../../apis/section/section';
import * as chunkAPI from '../../apis/chunk/chunk';
import * as bookmarkAPI from '../../apis/bookmark/bookmark';
import * as likeAPI from '../../apis/like/like';
import {
  deleteSectionResponseByAxios,
  getSectionResponseByAxios,
  makeSectionResponseByAxios,
  updateSectionResponseByAxios,
} from '../../apis/section/types';
import {
  deleteChunkResponseByAxios,
  makeChunkResponseByAxios,
  updateChunkResponseByAxios,
} from '../../apis/chunk/types';
import {
  deleteBookmarkResponse,
  insertBookmarkOfChunkResponse,
} from '../../apis/bookmark/types';
import {
  deleteLikeResponse,
  insertLikeOfChunkResponse,
} from '../../apis/like/types';

function* getSectionSaga(action: ReturnType<typeof getSection>) {
  try {
    const response: getSectionResponseByAxios = yield call(
      sectionAPI.getSection,
      action.payload,
    );
    if (response.isSuccess) {
      yield put({
        type: sagaType.GET_SECTION_SUCCESS,
        payload: response.section_list,
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
        type: sagaType.GET_SECTION_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error.response);
    yield put({
      type: sagaType.GET_SECTION_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* updateSectionSaga(action: ReturnType<typeof updateSection>) {
  try {
    const response: updateSectionResponseByAxios = yield call(
      sectionAPI.updateSection,
      action.payload,
    );
    if (response.isSuccess) {
      yield put({
        type: sagaType.UPDATE_SECTION_SUCCESS,
        payload: action.payload,
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
        type: sagaType.UPDATE_SECTION_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    yield put({
      type: sagaType.UPDATE_SECTION_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* makeSectionSaga(action: ReturnType<typeof makeSection>) {
  try {
    const response: makeSectionResponseByAxios = yield call(
      sectionAPI.makeSection,
      action.payload,
    );
    if (response.isSuccess) {
      action.payload.no = response.section_no;
      yield put({
        type: sagaType.MAKE_SECTION_SUCCESS,
        payload: action.payload,
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
        payload: action.payload,
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

function* deleteChunkSaga(action: ReturnType<typeof deleteChunk>) {
  try {
    const response: deleteChunkResponseByAxios = yield call(
      chunkAPI.deleteChunk,
      action.payload.chunk_no,
    );
    if (response.isSuccess) {
      yield put({
        type: sagaType.DELETE_CHUNK_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 0) {
      // TODO 해당 링크를 삭제할 권한이 있는 아이디가 아님
      yield put({
        type: sagaType.DELETE_CHUNK_NOAUTH,
        error: true,
        payload: '해당 링크를 삭제할 권한이 없습니다.',
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.DELETE_CHUNK_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error.response);
    yield put({
      type: sagaType.DELETE_CHUNK_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* makeChunkSaga(action: ReturnType<typeof makeChunk>) {
  try {
    const response: makeChunkResponseByAxios = yield call(
      chunkAPI.makeChunk,
      action.payload,
    );

    if (response.isSuccess) {
      action.payload.no = response.no;
      action.payload.regdate = response.regdate;

      yield put({
        type: sagaType.MAKE_CHUNK_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 0) {
      // TODO 해당 링크를 생성할 권한이 있는 아이디가 아님
      yield put({
        type: sagaType.MAKE_CHUNK_NOAUTH,
        error: true,
        payload: '해당 링크를 생성할 권한이 없습니다.',
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.MAKE_CHUNK_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.MAKE_CHUNK_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* updateChunkSaga(action: ReturnType<typeof updateChunk>) {
  try {
    const response: updateChunkResponseByAxios = yield call(
      chunkAPI.updateChunk,
      action.payload,
    );

    if (response.isSuccess) {
      yield put({
        type: sagaType.UPDATE_CHUNK_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 0) {
      // TODO 해당 링크를 생성할 권한이 있는 아이디가 아님
      yield put({
        type: sagaType.UPDATE_CHUNK_NOAUTH,
        error: true,
        payload: '해당 링크를 수정할 권한이 없습니다.',
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '재 로그인 해주세요.',
      });
    } else {
      yield put({
        type: sagaType.UPDATE_CHUNK_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.UPDATE_CHUNK_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* setBookmarkSaga(action: ReturnType<typeof setBookmark>) {
  try {
    const response: insertBookmarkOfChunkResponse = yield call(
      bookmarkAPI.insertBookmarkOfChunk,
      action.payload.chunk_no,
    );

    if (response.isSuccess) {
      action.payload.bookmark_no = response.bookmark_no;
      yield put({
        type: sagaType.SET_BOORMARK_SUCCESS,
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
      type: sagaType.SET_BOOKMARK_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* deleteBookmarkSaga(action: ReturnType<typeof deleteBookmark>) {
  try {
    const response: deleteBookmarkResponse = yield call(
      bookmarkAPI.deleteBookmarkOfChunk,
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

function* setLikeSaga(action: ReturnType<typeof setLike>) {
  try {
    const response: insertLikeOfChunkResponse = yield call(
      likeAPI.insertLikeOfChunk,
      action.payload.chunk_no,
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

function* deleteLikeSaga(action: ReturnType<typeof setLike>) {
  try {
    const response: deleteLikeResponse = yield call(
      likeAPI.deleteLike,
      action.payload.like_no,
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

export function* sectionSaga() {
  yield takeLatest(sagaType.MAKE_SECTION, makeSectionSaga);
  yield takeLatest(sagaType.DELETE_SECTION, deleteSectionSaga);
  yield takeEvery(sagaType.GET_SECTION, getSectionSaga);
  yield takeLatest(sagaType.UPDATE_SECTION, updateSectionSaga);
  yield takeLatest(sagaType.DELETE_CHUNK, deleteChunkSaga);
  yield takeLatest(sagaType.MAKE_CHUNK, makeChunkSaga);
  yield takeLatest(sagaType.UPDATE_CHUNK, updateChunkSaga);
  yield takeLatest(sagaType.SET_BOOKMARK, setBookmarkSaga);
  yield takeEvery(sagaType.DELETE_BOOKMARK, deleteBookmarkSaga);
  yield takeLatest(sagaType.SET_LIKE, setLikeSaga);
  yield takeLatest(sagaType.DELETE_LIKE, deleteLikeSaga);
}
