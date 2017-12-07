// @flow

type $setter<S, R> = (state: S, result: R) => S
type $selector<S, R> = (state: S)=>R
type $reducer = Function

export function scopeReducer<S, R>(selector: $selector<S, R>, setter: $setter<S, R>, reducer: $reducer, name: string){
  return (...args) => {
    const splitFunc = state => {
      return setter(state, reducer(...args)(selector(state)))
    }
    splitFunc.argz = args
    splitFunc.nm = name
    return splitFunc
  }
}

export const defaultScopeReducer = (locations: string, reducer: $reducer, name?: string)=>{
  const locationsArray = locations.split('.')
  const selector = (state)=>locationsArray.reduce((finalResult, location)=>finalResult[location], state)
  const setter = (state, result)=>({
    ...locationsArray.reduce((finalResult, location, i)=>{
      if(i === locationsArray.length - 1) {
        finalResult[location] = result
        return state
      }
      return finalResult[location]
    }, state)
  })
  return scopeReducer(selector, setter, reducer, `${locations}:${name}`)
}

export default (locations, reducers) => {
  return Object.keys(reducers).reduce((finalResult, key)=>{
    finalResult[key] = defaultScopeReducer(locations, reducers[key], key)
    return finalResult
  }, {})
}