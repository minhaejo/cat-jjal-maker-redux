import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import catReducer from '../features/catSlice'

export const store = configureStore({
  reducer: {
    cats:catReducer 
  },
});

export default store
