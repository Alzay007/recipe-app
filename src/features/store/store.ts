import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../reducers/recipesSlice';
import userReducer from '../reducers/userSlice';
import snackReducer from '../reducers/snackSlice';
import savedReducer from '../reducers/savedSlice';

export const store = configureStore({
  reducer: {
    recipesReducer,
    userReducer,
    snackReducer,
    savedReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
