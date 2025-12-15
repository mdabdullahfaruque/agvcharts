import React from 'react';
import Dashboard from './components/layout/Dashboard';
import { useAGVData } from './hooks/useAGVData';
import './App.css';

function App() {
  const { data, loading, error } = useAGVData();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading AGV Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-error">
        <h2>Error Loading Dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Dashboard data={data} />
    </div>
  );
}

export default App;
