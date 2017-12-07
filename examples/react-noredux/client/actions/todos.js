import reducer from '../reducers/todos'
import { createAction } from 'redux-actions'

export const addTodo = (payload)=>reducer['add todo'](payload)
export const deleteTodo = (payload)=>reducer['delete todo'](payload)
export const editTodo = (payload)=>reducer['edit todo'](payload)
export const completeTodo = (payload)=>reducer['complete todo'](payload)
export const completeAll = (payload)=>reducer['complete all'](payload)
export const clearCompleted = (payload)=>reducer['clear complete'](payload)
