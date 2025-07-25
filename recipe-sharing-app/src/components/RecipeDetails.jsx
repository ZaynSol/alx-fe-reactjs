import { useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore'; // ✅ Must be named import!

const RecipeDetails = () => {
  const { id } = useParams();

  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === parseInt(id))
  );

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>ID: {recipe.id}</p>
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeDetails;
