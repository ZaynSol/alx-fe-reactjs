// src/components/recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: 1,
      title: "Pasta",
      description: "Yummy!",
      ingredients: ["noodles", "sauce"],
      preparationTime: 20,
    },
    {
      id: 2,
      title: "Salad",
      description: "Healthy.",
      ingredients: ["lettuce", "tomato"],
      preparationTime: 10,
    },
  ],

  searchTerm: '',
  filteredRecipes: [],

  setSearchTerm: (term) =>
    set((state) => {
      const lowerTerm = term.toLowerCase();
      return {
        searchTerm: term,
        filteredRecipes: state.recipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(lowerTerm) ||
            recipe.description.toLowerCase().includes(lowerTerm) ||
            (recipe.ingredients &&
              recipe.ingredients.some((ing) =>
                ing.toLowerCase().includes(lowerTerm)
              )) ||
            (recipe.preparationTime &&
              recipe.preparationTime.toString().includes(lowerTerm))
        ),
      };
    }),

  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: recipes.filter((recipe) =>
        recipe.title
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase())
      ),
    })),

  addRecipe: (recipe) =>
    set((state) => {
      const newRecipe = {
        ...recipe,
        id: Date.now().toString(),
      };
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((r) =>
          r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        ),
      };
    }),
}));
