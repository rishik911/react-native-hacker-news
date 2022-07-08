import {all} from 'redux-saga/effects';
import HomeModuleSaga  from '../modules/HomeModule/Redux/HomeSaga'

export default function* IndexSaga() {
  yield all([HomeModuleSaga()]);
}