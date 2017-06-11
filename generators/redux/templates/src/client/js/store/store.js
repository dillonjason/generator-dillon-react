import { createStore, applyMiddleware, compose } from 'redux'
<%if(useSaga) {%>import createSagaMiddleware from 'redux-saga'<%}%>

import reducer from './reducer'
<%if(useSaga) {%>import { rootSaga } from '../sagas/index'<%}%>

<%if(useSaga) {%>const sagaMiddleware = createSagaMiddleware()<%}%>

export function configureStore (initialState = {}) {
  let store = createStore(
    reducer,
    initialState,
    compose(
      <%if(useSaga) {%>applyMiddleware(sagaMiddleware),<%}%>
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  <%if(useSaga) {%>sagaMiddleware.run(rootSaga)<%}%>

  return store
}

export const store = configureStore()
