import React, { useState } from 'react';
import FleetStatusChart from '../charts/FleetStatusChart';
import AGVTypeChart from '../charts/AGVTypeChart';
import TaskCompletionChart from '../charts/TaskCompletionChart';
import BatteryLevelChart from '../charts/BatteryLevelChart';
import PerformanceChart from '../charts/PerformanceChart';
import NavigationHeatmap from '../charts/NavigationHeatmap';
import UtilizationGantt from '../charts/UtilizationGantt';
import {
  getFleetStatusData,
  getAGVTypeDistribution,
  getTaskHistoryData,
  getBatteryLevelData,
  getPerformanceMetricsData,
  getNavigationHeatmapData,
  getUtilizationTimelineData
} from '../../utils/dataParser';
import './Dashboard.css';

const Dashboard = ({ data }) => {
  const [activeView, setActiveView] = useState('overview');

  if (!data) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading AGV Dashboard...</p>
      </div>
    );
  }

  const fleetStatusData = getFleetStatusData(data);
  const agvTypeData = getAGVTypeDistribution(data);
  const taskHistoryData = getTaskHistoryData(data);
  const batteryLevelData = getBatteryLevelData(data);
  const performanceData = getPerformanceMetricsData(data);
  const heatmapData = getNavigationHeatmapData(data);
  const ganttData = getUtilizationTimelineData(data);

  // Calculate KPIs
  const totalAGVs = data.totalAGVs;
  const activeAGVs = data.fleetSummary.active;
  const utilizationRate = ((activeAGVs / totalAGVs) * 100).toFixed(1);
  const avgBattery = (data.fleet.reduce((sum, agv) => sum + agv.batteryLevel, 0) / data.fleet.length).toFixed(1);
  const todayTasks = data.taskHistory[0].completedTasks;

  return (
    <div className="dashboard">
      {/* View Selector */}
      <div className="view-selector">
        <button 
          className={activeView === 'overview' ? 'active' : ''}
          onClick={() => setActiveView('overview')}
        >
          📈 Overview
        </button>
        <button 
          className={activeView === 'performance' ? 'active' : ''}
          onClick={() => setActiveView('performance')}
        >
          ⚡ Performance
        </button>
        <button 
          className={activeView === 'navigation' ? 'active' : ''}
          onClick={() => setActiveView('navigation')}
        >
          🗺️ Navigation
        </button>
      </div>

      {/* Charts Grid */}
      {activeView === 'overview' && (
        <div className="charts-grid">
          <div className="chart-card">
            <FleetStatusChart data={fleetStatusData} />
          </div>
          
          <div className="chart-card">
            <AGVTypeChart data={agvTypeData} />
          </div>
          
          <div className="chart-card chart-card-wide">
            <TaskCompletionChart data={taskHistoryData} />
          </div>
          
          <div className="chart-card chart-card-wide">
            <BatteryLevelChart data={batteryLevelData} />
          </div>
        </div>
      )}

      {activeView === 'performance' && (
        <div className="charts-grid">
          <div className="chart-card chart-card-full">
            <PerformanceChart data={performanceData} />
          </div>
          
          <div className="chart-card chart-card-full">
            <UtilizationGantt data={ganttData} />
          </div>
        </div>
      )}

      {activeView === 'navigation' && (
        <div className="charts-grid">
          <div className="chart-card chart-card-full">
            <NavigationHeatmap data={heatmapData} />
          </div>
          
          <div className="chart-card">
            <BatteryLevelChart data={batteryLevelData} />
          </div>
          
          <div className="chart-card">
            <FleetStatusChart data={fleetStatusData} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>AGV Dashboard v1.0.0 | Advanced Manufacturing Facility</p>
        <p>Data refreshed hourly | Real-time monitoring active</p>
      </footer>
    </div>
  );
};

export default Dashboard;
