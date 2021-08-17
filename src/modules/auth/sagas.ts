import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { getLocalLogin } from '../auth';
import * as loginAPI from '../../apis/auth/login';
import * as registerAPI from '../../apis/auth/register';
import * as sagaType from './types';
import * as authType from '../../apis/auth/types';
import jwtDecode from 'jwt-decode';
import { getGoogleLogin } from './actions';
function* logoutSaga() {
  try {
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
    console.log(loginResponseByAxios);
    if (loginResponseByAxios.isLogin) {
      //TODO 로그인 성공
      const token: authType.JwtDecodeFromUserInfo = jwtDecode(
        loginResponseByAxios.token,
      );
      const userInfo: sagaType.userInfo = {
        no: token.no,
        id: token.id,
        name: token.name,
        profile: token.profile,
        auth_type: 'google',
      };
      yield put({
        type: sagaType.GET_GOOGLE_LOGIN_SUCCESS,
        payload: userInfo,
      });
    } else {
      //TODO 로그인 실패
      console.log('1');
      const registerResponseByAxios: authType.RegisterResponseByAxios =
        yield call(registerAPI.googleRegister, action.payload);
      if (registerResponseByAxios.isSuccess) {
        // TODO 성공적으로 회원가입
        console.log('2');
        const userInfo: sagaType.userInfo = {
          no: registerResponseByAxios.no,
          id: action.payload.id,
          name: action.payload.name,
          profile: action.payload.profile,
          auth_type: 'google',
        };
        yield put({
          type: sagaType.GET_GOOGLE_LOGIN_SUCCESS,
          payload: userInfo,
        });
      } else {
        console.log('3');
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
      const token: authType.JwtDecodeFromUserInfo = jwtDecode(
        loginResponseByAxios.token,
      );
      const userInfo: sagaType.userInfo = {
        no: token.no,
        id: token.id,
        name: token.name,
        profile: token.profile,
        auth_type: 'local',
      };
      yield put({
        type: sagaType.GET_LOCAL_LOGIN_SUCCESS,
        payload: userInfo,
      });
    } else {
      // TODO 로그인 실패
      yield put({
        type: sagaType.GET_LOCAL_LOGIN_FAILE,
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

export function* authSaga() {
  yield takeEvery(sagaType.GET_LOGOUT, logoutSaga);
  yield takeLatest(sagaType.GET_LOCAL_LOGIN, localLoginSaga);
  yield takeLatest(sagaType.GET_GOOGLE_LOGIN, googleLoginSaga);
}
