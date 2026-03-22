import { useState, useCallback } from 'react';

/**
 * Custom hook for managing search functionality
 * @returns {Object} - Search state and handlers
 */
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const handleSearch = useCallback(async (query) => {
    if (!query || query.trim() === '') {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      // const data = await response.json();
      // setResults(data.results || []);

      // Mock results for demo
      setResults([
        { id: 1, title: 'Result 1', description: 'Description for result 1' },
        { id: 2, title: 'Result 2', description: 'Description for result 2' },
      ]);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    results,
    handleSearch,
    clearSearch,
  };
};
