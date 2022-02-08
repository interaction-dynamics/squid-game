import reducer, { gameInitialState, setDifficulty, setDistance, start } from '../game.slice'

// https://redux.js.org/usage/writing-tests

describe('reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(gameInitialState)
  })

  it('should change difficulty', () => {
    const previousState = gameInitialState
    const expectedState = {
      ...previousState,
      difficulty: 'hard'
    }

    expect(reducer(previousState, setDifficulty('hard'))).toEqual(expectedState)
  })

  it('should change distance', () => {
    const previousState = gameInitialState
    const expectedState = {
      ...previousState,
      distance: 20
    }

    expect(reducer(previousState, setDistance(20))).toEqual(expectedState)
  })

  it('should start game', () => {
    const previousState = gameInitialState
    const expectedState = {
      ...previousState,
      isStarted: true
    }

    expect(reducer(previousState, start(true))).toEqual(expectedState)
  })

  it('should start game', () => {
    const previousState = gameInitialState
    const expectedState = {
      ...previousState,
      isStarted: false
    }

    expect(reducer(previousState, start(false))).toEqual(expectedState)
  })
})
