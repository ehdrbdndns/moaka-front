import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import section, { sectionSaga } from './section';
import archive, { archiveSaga } from './archive';
import userList, { userListSaga } from './userList';
import mail, { mailSaga } from './mail';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ auth, section, archive, userList, mail });

export function* rootSaga() {
  yield all([
    authSaga(),
    sectionSaga(),
    archiveSaga(),
    userListSaga(),
    mailSaga(),
  ]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
