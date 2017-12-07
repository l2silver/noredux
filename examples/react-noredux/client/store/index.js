
import { createStore, applyMiddleware } from 'noredux'
import { logger } from '../middleware'
import initialState from '../reducers'

export default function configure() {
  const createStoreWithMiddleware = applyMiddleware(
    logger
  )(createStore)

  const store = createStoreWithMiddleware(initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
