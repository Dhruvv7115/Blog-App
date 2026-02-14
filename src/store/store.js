import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './authSlice'
import postSliceReducer from './postSlice';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    posts: postSliceReducer,
  }
});

export default store