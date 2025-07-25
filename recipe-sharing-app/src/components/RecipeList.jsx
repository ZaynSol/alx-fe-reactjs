// src/components/RecipeList.jsx
import React from 'react';
import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Recipe Sharing App</h1>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p>{recipe.description}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
              <p><strong>Prep Time:</strong> {recipe.preparationTime} min</p>
            </div>
          ))
        ) : (
          <p>No recipes match your search.</p>
        )}
      </div>
    </div>
  );
};

console.log("Component loaded");


export default RecipeList;


