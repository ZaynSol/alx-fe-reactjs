import axios from 'axios';

// Use literal string here for test to find it
const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw error;
  }
};
