import {defaultScopeReducers} from 'noredux'
export const initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0
}]

export default defaultScopeReducers('todos', {
  'add todo' (payload) {
    return (state) => {
      return [{
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: payload
      }, ...state]
    }
  },

  'delete todo' (payload) {
    return state => state.filter(todo => todo.id !== payload )
  },

  'edit todo' (payload) {
    return state=>state.map(todo => {
      return todo.id === payload.id
        ? { ...todo, text: payload.text }
        : todo
    })
  },

  'complete todo' (payload) {
    return state=>state.map(todo => {
      return todo.id === payload
        ? { ...todo, completed: !todo.completed }
        : todo
    })
  },

  'complete all' () {
    return state => {
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => {
        return {
          ...todo,
          completed: !areAllMarked
        }
      })
    }
  },

  'clear complete' () {
    return state=>state.filter(todo => todo.completed === false)
  }
})
