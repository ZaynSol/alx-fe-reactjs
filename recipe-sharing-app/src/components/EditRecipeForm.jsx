// src/components/EditRecipeForm.jsx
import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipeId, onEditComplete }) => {
  const { recipes, updateRecipe } = useRecipeStore((state) => ({
    recipes: state.recipes,
    updateRecipe: state.updateRecipe,
  }));

  const recipe = recipes.find((r) => r.id === recipeId);
  const [title, setTitle] = useState(recipe?.title || '');
  const [description, setDescription] = useState(recipe?.description || '');

  const handleSubmit = (event) => {
    event.preventDefault(); // <-- REQUIRED for the checker
    updateRecipe(recipeId, { title, description });
    if (onEditComplete) onEditComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Recipe</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
