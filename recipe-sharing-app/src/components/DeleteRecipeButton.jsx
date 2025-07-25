// src/components/DeleteRecipeButton.jsx
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  return (
    <button onClick={() => deleteRecipe(recipeId)}>Delete Recipe</button>
  );
};

export default DeleteRecipeButton;
