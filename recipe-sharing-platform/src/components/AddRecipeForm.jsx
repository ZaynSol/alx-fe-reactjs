import React, { useState } from 'react';

function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setsteps] = useState('');

  const [errors, setErrors] = useState({
    title: '',
    ingredients: '',
    steps: '',
  });

  const restFields = () => {
    setTitle('');
    setIngredients('');
    setsteps('');
    setErrors({
      title: '',
      ingredients: '',
      steps: '',
    });
  }

  const validate = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      ingredients: '',
      steps: '',
    };

    if (title.trim() === '') {
      newErrors.title = 'Title is required.';
      isValid = false;
    }

    if (ingredients.trim() === '' || ingredients.split('\n').length < 2) {
      newErrors.ingredients = 'Please enter at least two ingredients.';
      isValid = false;
    }

    if (steps.trim() === '') {
      newErrors.steps = 'steps are required.';
      isValid = false;
    }

    return {isValid, newErrors};
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {isValid, newErrors} = validate();

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    console.log('Form data:', { title, ingredients, steps });

    restFields();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Recipe Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
          <textarea
            id="ingredients"
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700">Steps</label>
          <textarea
            id="steps"
            rows="6"
            value={steps}
            onChange={(e) => setsteps(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
