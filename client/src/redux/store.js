import { configureStore } from '@reduxjs/toolkit'
import reducerSlice from '../reducer/reducerSlice'

export default configureStore({
  reducer: {
    reducerSlice
  },
})