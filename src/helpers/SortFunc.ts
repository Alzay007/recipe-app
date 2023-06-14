import { SortType } from '../types/SortType';
import { Recipe } from '../types/Recipe';

export function sortItems(itemsList: Recipe[], sortBy: SortType) {
  return itemsList.sort((a, b) => {
    switch (sortBy) {
      case SortType.RATING: {
        return b.rating - a.rating;
      }

      default:
        return a.id - b.id;
    }
  });
}
