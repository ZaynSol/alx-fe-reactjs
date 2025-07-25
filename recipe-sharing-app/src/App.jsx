import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails'; // ✅ Correct name
import EditRecipeForm from './components/EditRecipeForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} /> {/* ✅ Fixed name */}
        <Route path="/edit/:id" element={<EditRecipeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
