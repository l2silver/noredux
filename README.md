# noredux (Not Only Redux)

noredux is a non-event-driven version of redux. 

# Install

```
yarn add noredux
```

# Usage

```
import {createStore} from 'noredux'

const initialState = 1

const store = createStore(initialState)

const reducer = (state)=>state + 1

store.dispatch(reducer)

console.log(store.getState())
// 2
```

# noredux vs traditional redux

It shares the same idea of one state shared across the entire application, but it differs in how changes in the state are affected. In traditional redux, changes are dispatched as actions that go through a reducer function, match the action type to action, and then modify the state with the option of using additional information in the action. noredux dispatches functions that have one argument, the previous state, and return the next state.

# Why another state management library

I don't think most front-end applications are complicated enough to warrant event driven architecture. I've worked on a lot of projects varying in complexity, and I've yet to see a truly valid use case for having multiple reducers act on the same action, which is part of the advantage of event-driven architecture. I understand the rational for why someone might want to do this, and how it can appear to be a clean solution to a complicated issue, but the implicit nature of this design pattern makes debugging more difficult and increases onboarding time for new team members. To be sure, it's a design paradigm that makes sense in certain situations, but it seems like for the majority of front-end applications this approach is problematic.

# Problems with noredux

The basic problem with noredux is that setting up the reducers and initial state are more complicated than traditional redux. To achieve the scoping pattern that traditional redux combineReducers has(or packages that have similar functionality), every reducer essentially needs to be provided with a selector function and a setter function. The selector function ensures that the reducer receives only the part of the store's state that it's entitled to work on, and the setter is the function that merges the results from the reducer back into the store.

# Experimental

I don't use noredux in production, and unless it miraculously gains the attention of a major tech corporation, I problably won't be using it in the future. I think it's an interesting technology though, and I thought I would open up the idea for anyone else looking to experiment with different ways of designing front-end applications. Technically speaking, this isn't event considered flux.

# Example App

