import { configureStore } from '@reduxjs/toolkit'

import game from './game.slice'

const store = configureStore({
  reducer: { game }
})

export default store

export * from './game.slice'
