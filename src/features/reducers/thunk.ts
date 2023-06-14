import { Recipe } from 'types/Recipe';
import axios from 'axios';
import { AppDispatch } from '../store/store';
import { recipesSlice } from './recipesSlice';

export const BASE_URL = 'https://apple-shop-ed92.onrender.com';

export const fetchRecipes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(recipesSlice.actions.recipesFetching());

    const response = await axios.get<Recipe[]>(BASE_URL + '/recipes');

    dispatch(recipesSlice.actions.recipesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(recipesSlice.actions.recipesFetchingError());
  }
};
