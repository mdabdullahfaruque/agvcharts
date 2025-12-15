import { useState, useEffect } from 'react';

/**
 * Custom hook to load and manage AGV data
 */
export const useAGVData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch the JSON file from the public directory
        // Use process.env.PUBLIC_URL to handle subdirectory deployments
        const response = await fetch(`${process.env.PUBLIC_URL}/data/agv-data.json`);
        if (!response.ok) {
          throw new Error('Failed to load AGV data');
        }
        const jsonData = await response.json();
        
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};
