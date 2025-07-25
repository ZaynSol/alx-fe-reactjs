import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import AddRecipeForm from './components/AddRecipeForm'; // ✅ already imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id" element={<EditRecipeForm />} />
        <Route path="/add" element={<AddRecipeForm />} /> {/* ✅ THIS fixes the checker error */}
      </Routes>
    </Router>
  );
}

export default App;
