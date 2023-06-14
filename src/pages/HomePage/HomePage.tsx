import { useAppSelector } from 'features/hooks/hooks';
import { RecipesList } from 'components/RecipesList';
import { Loader } from 'components/Loader';
import { AuthSnackbar } from 'components/AuthSnackBar';

import styles from './HomePage.module.scss';
import { useCallback, useMemo, useState } from 'react';
import { SortType } from 'types/SortType';
import { sortItems } from 'helpers/SortFunc';
import { SearchBar } from 'components/SearchField';
import { SortField } from 'components/SortField';

export const HomePage = () => {
  const { isLoading, recipes } = useAppSelector(
    (state) => state.recipesReducer
  );

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortType>(SortType.DEFAULT);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value.trimStart());
    },
    []
  );

  const handleStatus = (value: SortType) => {
    setSortBy(value);
  };

  const visibleList = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(lowerCaseQuery) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(lowerCaseQuery)
        )
    );
  }, [recipes, query]);

  const sortedRecipes = sortItems(visibleList, sortBy);

  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Recipes List</h1>

      <SearchBar searchQuery={query} handleOnChange={onChangeHandler} />

      <SortField sortBy={sortBy} handleStatus={handleStatus} />

      {isLoading && <Loader />}

      <RecipesList recipes={sortedRecipes} />

      <AuthSnackbar />
    </div>
  );
};
