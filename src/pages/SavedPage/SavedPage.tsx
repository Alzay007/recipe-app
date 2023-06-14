import { useEffect, useMemo } from 'react';
import { useAppSelector } from 'features/hooks/hooks';
import { RecipesList } from 'components/RecipesList';
import { Recipe } from 'types/Recipe';
import { Title } from 'components/Title';
import { useAuth } from 'features/hooks/useAuth';

import styles from './SavedPage.module.scss';

export const SavedPage = () => {
  const data = JSON.parse(localStorage.getItem('id') || '{}');
  const { saved } = useAppSelector((state) => state.savedReducer);
  const { recipes } = useAppSelector((state) => state.recipesReducer);
  const { isAuth } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleList = useMemo(() => {
    return recipes.filter((recipe: Recipe) => saved.includes(recipe.id + ''));
  }, [saved, recipes]);

  return (
    <div className={styles.saved}>
      <Title title={'Saved'} />

      {saved.length < 1 && isAuth ? (
        <div className={styles.cart__empty}>
          <span className={styles.cart__empty_text}>saved is empty</span>
        </div>
      ) : (
        <div className={styles.cart__content}>
          {isAuth ? (
            <>
              {data.length > 0 ? (
                <>
                  <RecipesList recipes={visibleList} />
                </>
              ) : (
                <div className={styles.cart__empty}>
                  <span className={styles.cart__empty_text}>
                    saved is empty
                  </span>
                </div>
              )}
            </>
          ) : (
            <span className={styles.cart__empty_text}>
              Please, log in to proceed
            </span>
          )}
        </div>
      )}
    </div>
  );
};
