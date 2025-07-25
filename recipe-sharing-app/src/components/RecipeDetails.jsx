import { useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import FavoriteButton from './FavoriteButton'; // ✅ add this

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === parseInt(id))
  );

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">{recipe.title}</h2>
      <p>ID: {recipe.id}</p>
      <p>{recipe.description}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Prep Time:</strong> {recipe.preparationTime} min</p>
      <FavoriteButton recipeId={recipe.id} /> {/* ✅ Add favorite button */}
    </div>
  );
};

export default RecipeDetails;
