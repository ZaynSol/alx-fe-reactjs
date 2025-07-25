import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  return (
    <input
      type="text"
      placeholder="Search by name, ingredient, or time..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 w-full mb-4 rounded-md"
    />
  );
};

export default SearchBar;
