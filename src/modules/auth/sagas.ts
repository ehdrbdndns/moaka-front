import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getLocalLogin } from '../auth';
import * as loginAPI from '../../apis/auth/login';
import * as registerAPI from '../../apis/auth/register';
import * as userAPI from '../../apis/auth/user';
import * as sagaType from './types';
import * as authType from '../../apis/auth/types';
import jwtDecode from 'jwt-decode';
import { getGoogleLogin, getRegister, updateUser } from './actions';

function* logoutSaga() {
  try {
    localStorage.removeItem('token');
    yield put({
      type: sagaType.GET_LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_LOGOUT_ERROR,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* googleLoginSaga(action: ReturnType<typeof getGoogleLogin>) {
  try {
    //TODO google id를 서버로 전송한 후 기존 유저인지 아닌지를 리턴받음
    const loginResponseByAxios: authType.LoginResponseByAxios = yield call(
      loginAPI.googleLogin,
      action.payload.sub,
    );
    if (loginResponseByAxios.isLogin) {
      //TODO 로그인 성공
      localStorage.setItem('token', loginResponseByAxios.token);
      const token: authType.JwtDecodeFromUserInfo = jwtDecode(
        loginResponseByAxios.token,
      );
      const userInfo: sagaType.userInfo = {
        no: token.no,
        id: token.id,
        name: token.name,
        profile: token.profile,
        category: token.category,
        auth_type: 'google',
        isLogin: true,
      };
      yield put({
        type: sagaType.GET_GOOGLE_LOGIN_SUCCESS,
        payload: userInfo,
      });
    } else {
      //TODO 로그인 실패
      const registerResponseByAxios: authType.RegisterResponseByAxios =
        yield call(registerAPI.googleRegister, action.payload);
      if (registerResponseByAxios.isSuccess) {
        // TODO 성공적으로 회원가입
        const userInfo: sagaType.userInfo = {
          no: registerResponseByAxios.no,
          id: action.payload.id,
          name: action.payload.name,
          profile: action.payload.profile,
          category: [],
          auth_type: 'google',
          isLogin: true,
        };
        yield put({
          type: sagaType.GET_GOOGLE_LOGIN_SUCCESS,
          payload: userInfo,
        });
      } else {
        // TODO 회원가입 실패
        yield put({
          type: sagaType.GET_GOOGLE_LOGIN_FAILE,
        });
      }
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_GOOGLE_LOGIN_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* localLoginSaga(action: ReturnType<typeof getLocalLogin>) {
  try {
    const loginResponseByAxios: authType.LoginResponseByAxios = yield call(
      loginAPI.localLogin,
      action.payload,
    );
    if (loginResponseByAxios.isLogin) {
      // TODO 로그인 성공
      localStorage.setItem('token', loginResponseByAxios.token);
      const token: authType.JwtDecodeFromUserInfo = jwtDecode(
        loginResponseByAxios.token,
      );
      const userInfo: sagaType.userInfo = {
        no: token.no,
        id: token.id,
        name: token.name,
        profile: token.profile,
        category: token.category,
        auth_type: 'local',
        isLogin: true,
      };
      yield put({
        type: sagaType.GET_LOCAL_LOGIN_SUCCESS,
        payload: userInfo,
      });
    } else {
      // TODO 로그인 실패
      yield put({
        type: sagaType.GET_LOCAL_LOGIN_FAILE,
        payload: '이메일 또는 비밀번호',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_LOCAL_LOGIN_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* localRegisterSaga(action: ReturnType<typeof getRegister>) {
  try {
    const registerResponseByAxios: authType.RegisterResponseByAxios =
      yield call(registerAPI.localRegister, action.payload);
    if (registerResponseByAxios.isSuccess) {
      // TODO 성공적으로 회원가입
      yield put({
        type: sagaType.GET_REGISTER_SUCCESS,
      });
    } else if (!registerResponseByAxios.isSuccess) {
      // TODO 회원가입 실패 ex) 이미 존재하는 회원
      yield put({
        type: sagaType.GET_REGISTER_FAILE,
        payload: '이미 존재하는 이메일 입니다.',
      });
    } else {
      yield put({
        type: sagaType.GET_REGISTER_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.GET_REGISTER_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* setUserSaga() {
  try {
    const response: authType.setUserResponse = yield call(userAPI.setUser);

    const userInfo: sagaType.userInfo = {
      no: response.no,
      id: response.id,
      name: response.name,
      profile: response.profile,
      category: response.category,
      auth_type: '',
      isLogin: true,
    };

    if (response.isSuccess) {
      yield put({
        type: sagaType.SET_USER_SUCCESS,
        payload: userInfo,
      });
    } else if (response.error === 403) {
      localStorage.removeItem('token');

      yield put({
        type: sagaType.SET_USER_FAIL,
        payload: '토큰 기한 만료',
      });
    } else {
      yield put({
        type: sagaType.SET_USER_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.SET_USER_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

function* updateUserSaga(action: ReturnType<typeof updateUser>) {
  try {
    const response: authType.updateUserResponse = yield call(
      userAPI.updateUser,
      action.payload,
    );

    if (response.isSuccess) {
      localStorage.setItem('token', response.token);
      action.payload.info.profile = response.profile;
      yield put({
        type: sagaType.UPDATE_USER_SUCCESS,
        payload: action.payload,
      });
    } else if (response.error === 403) {
      yield put({
        type: sagaType.EXPIRE_JWT_TOKEN,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    } else {
      yield put({
        type: sagaType.UPDATE_USER_ERROR,
        error: true,
        payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
      });
    }
  } catch (error) {
    console.log(error);
    yield put({
      type: sagaType.UPDATE_USER_ERROR,
      error: true,
      payload: '현재 서버에 문제가 있습니다. 추후에 다시 시도해주세요.',
    });
  }
}

export function* authSaga() {
  yield takeEvery(sagaType.GET_LOGOUT, logoutSaga);
  yield takeLatest(sagaType.GET_LOCAL_LOGIN, localLoginSaga);
  yield takeLatest(sagaType.GET_GOOGLE_LOGIN, googleLoginSaga);
  yield takeLatest(sagaType.GET_REGISTER, localRegisterSaga);
  yield takeEvery(sagaType.SET_USER, setUserSaga);
  yield takeLatest(sagaType.UPDATE_USER, updateUserSaga);
}
