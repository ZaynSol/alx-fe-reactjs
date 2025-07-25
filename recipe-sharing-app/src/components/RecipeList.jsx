import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this
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
            <Link to={`/recipes/${recipe.id}`} key={recipe.id}> {/* ✅ Make each item clickable */}
              <div className="border p-4 rounded shadow hover:shadow-lg transition">
                <h2 className="text-lg font-semibold">{recipe.title}</h2>
                <p>{recipe.description}</p>
                <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                <p><strong>Prep Time:</strong> {recipe.preparationTime} min</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No recipes match your search.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
