// @flow

type $setter<S, R> = (state: S, result: R) => S
type $selector<S, R> = (state: S)=>R
type $reducer = Function

export function scopeReducer<S, R>(selector: $selector<S, R>, setter: $setter<S, R>, reducer: $reducer, name: string){
  return (...args) => {
    const splitFunc = state => {
      return setter(state, reducer(...args)(selector(state)))
    }
    splitFunc.args = args
    splitFunc.type = name
    return splitFunc
  }
}

export const defaultScopeReducer = (locations: string, reducer: $reducer, name?: string)=>{
  const locationsArray = locations.split('.')
  const selector = (state)=>locationsArray.reduce((finalResult, location)=>finalResult[location], state)
  const setter = (state, result)=>{
    const nextState = {...state}
    const prevLoc = []
    locationsArray.forEach((loc, i)=>{
      const interState = prevLoc.reduce((finalResult, lloc)=>{
        return finalResult[lloc]
      }, nextState)
      if(i === locationsArray.length - 1){
        interState[loc] = result
      } else {
        interState[loc] = {...interState[loc]}
        prevLoc.push(loc)
      }
    })
    return nextState
  }
  return scopeReducer(selector, setter, reducer, `${locations}:${name}`)
}

export default (locations, reducers) => {
  return Object.keys(reducers).reduce((finalResult, key)=>{
    finalResult[key] = defaultScopeReducer(locations, reducers[key], key)
    return finalResult
  }, {})
}