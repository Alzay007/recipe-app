import { Grid } from '@material-ui/core';
import { RecipeCard } from '../RecipeCard';
import { Recipe } from 'types/Recipe';

interface Props {
  recipes: Recipe[];
}

export const RecipesList: React.FC<Props> = ({ recipes }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe, index) => (
        <Grid item key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};
