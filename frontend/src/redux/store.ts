import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/auth/authSlice'
import mainReducer from './features/main/mainSlice'
import popupsSlice from './features/popups/popupsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      main: mainReducer,
      popups: popupsSlice,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']> // wtf is this
export type AppDispatch = AppStore['dispatch']
