import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { createWrapper /* HYDRATE */ } from 'next-redux-wrapper'
import { Action } from 'redux'

import pokemonApi from '../services/pokemon'

const createStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pokemonApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

export const store = createStore()

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof createStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(createStore)
