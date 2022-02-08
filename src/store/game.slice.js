import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    difficulty: 'easy',
    distance: 0,
    isStarted: false
  },
  reducers: {
    setDifficulty: (state, { payload }) => {
      console.log('setDifficulty', payload)
      state.difficulty = payload
    },
    setDistance: (state, { payload }) => {
      state.distance = payload
    },
    start: (state, { payload }) => {
      state.isStarted = payload
    }
  }
})

export const { setDifficulty, setDistance, start } = gameSlice.actions

export default gameSlice.reducer

export const getDifficulty = state => state.game.difficulty

export const getDistance = state => state.game.distance

export const isStarted = state => state.game.isStarted
