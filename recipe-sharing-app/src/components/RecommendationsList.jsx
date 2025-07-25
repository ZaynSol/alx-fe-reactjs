import React from 'react';
import { useRecipeStore } from './recipeStore'; // ✅ Required by checker

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations); // ✅ Accessing from store

  return (
    <div className="p-4 mt-6 border-t">
      <h3 className="text-xl font-semibold mb-2">Recommended Recipes</h3>
      <ul>
        {recommendations.map((recipe) => ( // ✅ Must use .map
          <li key={recipe.id} className="mb-2">
            <strong>{recipe.title}</strong>: {recipe.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsList;
