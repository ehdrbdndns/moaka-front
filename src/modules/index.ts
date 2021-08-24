import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import section, { sectionSaga } from './section';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ auth, section });

export function* rootSaga() {
  yield all([authSaga(), sectionSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
