// @flow
class NotOnlyReduxStore {
  state = null
  listeners = []
  constructor(initState: any) {
    this.state = initState
  }
  getState = () => {
    return this.state
  }
  replaceReducer = (nextState) => {
    this.state = nextState
  }
  dispatch = (reducer: Function) => {
    this.state = reducer(this.state)
    this.listeners.forEach(listener => {
      listener(this.state)
    })
  }
  subscribe = listener => {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }
    this.listeners.push(listener)
    let isSubscribed = true
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }
      isSubscribed = false
      const index = this.listeners.indexOf(listener)
      this.listeners.splice(index, 1)
    }
  }
}

export default function createStore(initState) {
  return new NotOnlyReduxStore(initState)
}
