import { Recipe } from 'types/Recipe';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecipesState {
  recipes: Recipe[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: RecipesState = {
  recipes: [],
  isLoading: false,
  isError: false
};

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    recipesFetching(state) {
      state.isLoading = true;
    },
    recipesFetchingSuccess(state, action: PayloadAction<Recipe[]>) {
      state.isLoading = false;
      state.recipes = action.payload;
    },
    recipesFetchingError(state) {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export default recipesSlice.reducer;

export const { recipesFetching, recipesFetchingSuccess, recipesFetchingError } =
  recipesSlice.actions;
