// @flow
import scopeReducers from './'

const reducer1 = {
  amount1: (amount) => () => amount,
  amount2: (amount1, amount2) => () => amount1 + amount2
}

describe('combineReducers', () => {
  it('takes object of reducers and ensures that they only receive their respective states', () => {
    const scopedReducers1 = scopeReducers('reducer1', reducer1)
    const scopedReducers2 = scopeReducers('reducer2', reducer1)
    const initState = { reducer1: null, reducer2: null }
    expect(scopedReducers1.amount1(1)(initState)).toEqual({
      reducer1: 1,
      reducer2: null
    })
    expect(scopedReducers1.amount2(1, 2)(initState)).toEqual({
      reducer1: 3,
      reducer2: null
    })
    expect(scopedReducers2.amount1(1)(initState)).toEqual({
      reducer1: null,
      reducer2: 1
    })
    expect(scopedReducers2.amount2(1, 2)(initState)).toEqual({
      reducer1: null,
      reducer2: 3
    })
  })
})
