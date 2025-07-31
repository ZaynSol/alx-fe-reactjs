import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { getUserProfile } from './services/githubService';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    try {
      setError('');
      const userData = await getUserProfile(username);
      setUser(userData);
    } catch (err) {
      setUser(null);
      setError('User not found');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={{ marginTop: '1rem' }}>
          <img src={user.avatar_url} alt="avatar" width="100" />
          <h2>{user.name || user.login}</h2>
          <p>{user.bio}</p>
          <a href={user.html_url} target="_blank" rel="noreferrer">View Profile</a>
        </div>
      )}
    </div>
  );
}

export default App;
