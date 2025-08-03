import React, { useState, useEffect, useCallback } from "react";
import { searchUsers, getUserDetails } from "../services/githubService";

const UserCard = ({ user }) => {
  const [details, setDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        const data = await getUserDetails(user.login);
        if (!cancelled) setDetails(data);
      } catch {
        // ignore for now
      } finally {
        if (!cancelled) setLoadingDetails(false);
      }
    };
    fetchDetails();
    return () => {
      cancelled = true;
    };
  }, [user.login]);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center border rounded p-4 gap-4 shadow-sm">
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        className="w-16 h-16 rounded-full flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lg hover:underline"
            >
              {user.login}
            </a>
            <div className="text-sm text-gray-600">{user.type}</div>
          </div>
          <div className="mt-2 sm:mt-0 text-xs px-2 py-1 bg-gray-100 rounded">
            Score: {Math.round(user.score)}
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-4">
          {loadingDetails && <div>Loading details...</div>}
          {details && (
            <>
              {details.location && (
                <div>
                  <strong>Location:</strong> {details.location}
                </div>
              )}
              <div>
                <strong>Repos:</strong> {details.public_repos}
              </div>
              <div>
                <strong>Followers:</strong> {details.followers}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = useCallback(
    async (reset = false) => {
      if (!username && !location && !minRepos) {
        setUsers([]);
        setHasMore(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const targetPage = reset ? 1 : page;
        const result = await searchUsers({
          username,
          location,
          minRepos,
          page: targetPage,
          per_page: 10,
        });

        const newItems = result.items || [];
        setUsers((prev) => (reset ? newItems : [...prev, ...newItems]));
        setHasMore(newItems.length === 10); // crude: full page implies possible more
        setPage(targetPage + 1);
      } catch (err) {
        setError(err.message || "Search failed");
      } finally {
        setLoading(false);
      }
    },
    [username, location, minRepos, page]
  );

  // auto reset when filters change
  useEffect(() => {
    setPage(1);
    fetchUsers(true);
  }, [username, location, minRepos, fetchUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers(true);
  };

  const handleClear = () => {
    setUsername("");
    setLocation("");
    setMinRepos("");
    setUsers([]);
    setPage(1);
    setHasMore(false);
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 md:grid-cols-3 mb-6"
        aria-label="Advanced GitHub user search"
      >
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            placeholder="e.g. torvalds"
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="location" className="mb-1 font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            placeholder="e.g. Ethiopia"
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="minRepos" className="mb-1 font-medium">
            Min Repos
          </label>
          <input
            id="minRepos"
            type="number"
            min="0"
            value={minRepos}
            placeholder="e.g. 10"
            onChange={(e) => setMinRepos(e.target.value)}
            className="border rounded p-2 focus:outline-none focus:ring"
          />
        </div>

        <div className="md:col-span-3 flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="border px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 mb-4" role="alert">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {users.map((u) => (
          <UserCard key={u.login} user={u} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => fetchUsers(false)}
            className="bg-gray-800 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}

      {!loading && users.length === 0 && (
        <p className="mt-6 text-center text-gray-500">
          No users match the current criteria.
        </p>
      )}
    </div>
  );
};

export default Search;
