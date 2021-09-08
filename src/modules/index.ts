import { combineReducers } from 'redux';
import auth, { authSaga } from './auth';
import section, { sectionSaga } from './section';
import archive, { archiveSaga } from './archive';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ auth, section, archive });

export function* rootSaga() {
  yield all([authSaga(), sectionSaga(), archiveSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
