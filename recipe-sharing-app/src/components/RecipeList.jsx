// src/components/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (title, description) =>
    set((state) => ({
      recipes: [
        ...state.recipes,
        {
          id: Date.now(),
          title,
          description,
        },
      ],
    })),
}));

export default useRecipeStore;
