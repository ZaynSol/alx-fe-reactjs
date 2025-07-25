import React from 'react';
import { useRecipeStore } from './recipeStore'; // adjust path if needed

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorited = favorites.includes(recipeId);

  const toggleFavorite = () => {
    if (isFavorited) removeFavorite(recipeId);
    else addFavorite(recipeId);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`mt-2 px-3 py-1 rounded ${
        isFavorited ? 'bg-red-500 text-white' : 'bg-gray-300'
      }`}
    >
      {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
