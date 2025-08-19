import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import './App.css'
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Router>
      <nav>
        <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path='/profile/*' element={<ProtectedRoute component={<Profile />} />} />
        <Route path='/blog/:id' element={<BlogPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h2>Home</h2>} />
      </Routes>
    </Router>
  )
}

export default App
