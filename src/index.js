// @flow

import applyMiddleware from './applyMiddleware'
import compose from './compose'
import createStore from './createStore'
import defaultScopeReducers, {scopeReducer, defaultScopeReducer} from './scopeReducers'

export {
  applyMiddleware,
  compose,
  createStore,
  scopeReducer,
  defaultScopeReducer,
  defaultScopeReducers,
}