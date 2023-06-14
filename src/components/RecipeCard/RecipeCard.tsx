import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia
} from '@material-ui/core';
import { Rating } from '@mui/material';
import classNames from 'classnames';

import { Recipe } from 'types/Recipe';
import { BASE_URL } from 'features/reducers/thunk';
import { useAuth } from 'features/hooks/useAuth';
import { useAppDispatch, useAppSelector } from 'features/hooks/hooks';
import { addItem, removeItem } from 'features/reducers/savedSlice';
import { openSnackBar } from 'features/reducers/snackSlice';

import styles from './RecipeCard.module.scss';

interface Props {
  recipe: Recipe;
}

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const { id, title, description, rating, ingredients, instructions, image } =
    recipe;

  const [showInstructions, setShowInstructions] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const { saved } = useAppSelector((state) => state.savedReducer);

  const itemsSet = new Set(saved);
  const isCardInArray = itemsSet.has(String(id));

  const handleSetCardInData = () => {
    const itemId = String(id);
    dispatch(isCardInArray ? removeItem(itemId) : addItem(itemId));
  };

  const handleSetOpenSnack = () => {
    dispatch(openSnackBar());
  };

  const handleToggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const renderInstructionsButton = isAuth ? (
    <button onClick={handleToggleInstructions} className={styles.card__btn}>
      {showInstructions ? 'Hide Instructions' : 'Show Instructions'}
    </button>
  ) : null;

  const renderInstructionsContent =
    isAuth && showInstructions ? (
      <>
        <Typography variant="h6">Instructions:</Typography>
        {instructions.split('\n').map((instruction, index) => (
          <React.Fragment key={index}>
            {instruction}
            <br />
          </React.Fragment>
        ))}
      </>
    ) : null;

  return (
    <Card className={styles.card}>
      <div>
        <CardHeader
          title={title}
          subheader={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>Рейтинг:</span>
              <Rating value={rating} readOnly />
            </div>
          }
        />
        {image && (
          <CardMedia
            component="img"
            alt={title}
            height="200"
            image={`${BASE_URL}/${image}`}
            title={title}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography
            variant="h6"
            style={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            Інгрідієнти:
          </Typography>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          {renderInstructionsButton}
          {renderInstructionsContent}
        </CardContent>
      </div>
      <CardActions className={styles.card__container}>
        <Button
          className={classNames(styles.card__checkout, {
            [styles.card__uncheckout]: isCardInArray
          })}
          onClick={isAuth ? handleSetCardInData : handleSetOpenSnack}
        >
          {isCardInArray ? 'remove' : 'add to favorites'}
        </Button>
      </CardActions>
    </Card>
  );
};
