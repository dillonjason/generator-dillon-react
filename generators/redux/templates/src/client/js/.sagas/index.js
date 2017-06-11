import { fork } from 'redux-saga/effects'

import { getMockData } from './app_saga'

export function * rootSaga () {
  yield [
    fork(getMockData)
  ]
}
