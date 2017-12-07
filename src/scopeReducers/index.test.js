// @flow
import scopeReducers from './'

const reducer1 = {
  amount1: (amount) => state => amount,
  amount2: (amount1, amount2) => state => amount1 + amount2
}

describe('combineReducers', () => {
  it('takes object of reducers and ensures that they only receive their respective states', () => {
    const selector = state => state.reducer1
    const setter = (state, result) => ({
      ...state,
      ['reducer1']: result
    })
    const selector2 = state => state.reducer2
    const setter2 = (state, result) => ({
      ...state,
      ['reducer2']: result
    })
    const severedReducers1 = scopeReducers(selector, setter, reducer1)
    const severedReducers2 = scopeReducers(selector2, setter2, reducer1)
    const initState = { reducer1: null, reducer2: null }
    expect(severedReducers1.amount1(1)(initState)).toEqual({
      reducer1: 1,
      reducer2: null
    })
    expect(severedReducers1.amount2(1, 2)(initState)).toEqual({
      reducer1: 3,
      reducer2: null
    })
    expect(severedReducers2.amount1(1)(initState)).toEqual({
      reducer1: null,
      reducer2: 1
    })
    expect(severedReducers2.amount2(1, 2)(initState)).toEqual({
      reducer1: null,
      reducer2: 3
    })
  })
})
