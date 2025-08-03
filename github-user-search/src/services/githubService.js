import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Token from .env (Vite: VITE_GITHUB_TOKEN, CRA would be REACT_APP_GITHUB_TOKEN)
const token = import.meta?.env?.VITE_GITHUB_TOKEN || ''; // adjust if you're using CRA: process.env.REACT_APP_GITHUB_TOKEN

const defaultHeaders = {
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});

/**
 * Build the GitHub search query string with optional filters.
 */
function buildQuery({ username, location, minRepos }) {
  const parts = [];
  if (username) parts.push(`${username} in:login`);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);
  return parts.join(' ');
}

/**
 * Search users with advanced filters (username, location, minimum repos) and pagination.
 */
export async function searchUsers({
  username = '',
  location = '',
  minRepos = '',
  page = 1,
  per_page = 10,
}) {
  const q = buildQuery({ username, location, minRepos });
  if (!q) {
    return { items: [], total_count: 0 };
  }

  try {
    const response = await api.get('/search/users', {
      params: {
        q,
        page,
        per_page,
      },
    });
    return response.data; // contains items[], total_count, etc.
  } catch (error) {
    if (error.response) {
      // GitHub error (e.g., rate limit)
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      throw new Error(`GitHub search failed: ${status} ${message}`);
    }
    throw new Error(`Network error: ${error.message}`);
  }
}

/**
 * Fetch full user profile (for location, repo count, followers, etc.)
 */
export async function getUserDetails(username) {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      throw new Error(`Failed to fetch user details: ${status} ${message}`);
    }
    throw new Error(`Network error: ${error.message}`);
  }
}

/**
 * Legacy/simple alias (keeps existing code working)
 */
export const fetchUserData = getUserDetails;
