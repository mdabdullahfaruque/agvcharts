import React, { useState, useEffect } from 'react';
import './FleetCommandCenter.css';

const FleetCommandCenter = ({ data }) => {
  const [animatedValues, setAnimatedValues] = useState({
    active: 0,
    efficiency: 0,
    tasksCompleted: 0,
    utilization: 0
  });

  const fleetStats = data?.fleetSummary || {};
  const totalAGVs = Object.values(fleetStats).reduce((sum, val) => sum + val, 0);
  const activeCount = fleetStats.active || 0;
  
  // Calculate metrics
  const latestPerformance = data?.performanceMetrics?.[data.performanceMetrics.length - 1] || {};
  const efficiency = latestPerformance.fleetUtilization || 0;
  const tasksToday = data?.taskHistory?.reduce((sum, day) => sum + day.completed, 0) || 0;
  const utilization = latestPerformance.fleetUtilization || 0;

  // Animate values on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedValues({
        active: Math.floor(activeCount * progress),
        efficiency: Math.floor(efficiency * progress),
        tasksCompleted: Math.floor(tasksToday * progress),
        utilization: Math.floor(utilization * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          active: activeCount,
          efficiency: efficiency,
          tasksCompleted: tasksToday,
          utilization: utilization
        });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [activeCount, efficiency, tasksToday, utilization]);

  // Calculate status for visual indicators
  const getStatusLevel = (value, thresholds) => {
    if (value >= thresholds.excellent) return 'excellent';
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.warning) return 'warning';
    return 'critical';
  };

  const efficiencyStatus = getStatusLevel(efficiency, { excellent: 90, good: 75, warning: 60 });
  const utilizationStatus = getStatusLevel(utilization, { excellent: 85, good: 70, warning: 50 });

  // Recent incidents
  const recentIncidents = data?.incidents?.slice(0, 3) || [];
  
  // AGV Status Grid
  const agvList = data?.detailedAGVs || [];

  return (
    <div className="command-center">
      <div className="command-center-header">
        <div className="header-left">
          <h1 className="command-title">Fleet Command Center</h1>
          <div className="live-indicator">
            <span className="pulse-dot"></span>
            <span>Live</span>
          </div>
        </div>
        <div className="header-right">
          <div className="system-status status-operational">
            <span className="status-icon">●</span>
            System Operational
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card kpi-primary">
          <div className="kpi-icon">🤖</div>
          <div className="kpi-content">
            <div className="kpi-label">Active AGVs</div>
            <div className="kpi-value">{animatedValues.active}<span className="kpi-total">/{totalAGVs}</span></div>
            <div className="kpi-change positive">+3 from yesterday</div>
          </div>
          <div className="kpi-sparkline">
            <div className="sparkline-bars">
              {[65, 72, 68, 75, 82, 78, 85].map((height, i) => (
                <div key={i} className="spark-bar" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        <div className={`kpi-card kpi-${efficiencyStatus}`}>
          <div className="kpi-icon">⚡</div>
          <div className="kpi-content">
            <div className="kpi-label">Fleet Efficiency</div>
            <div className="kpi-value">{animatedValues.efficiency}<span className="kpi-unit">%</span></div>
            <div className="kpi-change positive">+2.5% this week</div>
          </div>
          <div className="circular-progress">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="progress-bg"/>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                className="progress-fill"
                style={{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - efficiency / 100)}`
                }}
              />
            </svg>
          </div>
        </div>

        <div className="kpi-card kpi-success">
          <div className="kpi-icon">✓</div>
          <div className="kpi-content">
            <div className="kpi-label">Tasks Completed Today</div>
            <div className="kpi-value">{animatedValues.tasksCompleted}</div>
            <div className="kpi-change positive">96.8% success rate</div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: '96.8%' }}></div>
          </div>
        </div>

        <div className={`kpi-card kpi-${utilizationStatus}`}>
          <div className="kpi-icon">📊</div>
          <div className="kpi-content">
            <div className="kpi-label">Fleet Utilization</div>
            <div className="kpi-value">{animatedValues.utilization}<span className="kpi-unit">%</span></div>
            <div className="kpi-change neutral">Optimal range</div>
          </div>
          <div className="utilization-gauge">
            <div className="gauge-fill" style={{ width: `${utilization}%` }}></div>
            <div className="gauge-marker" style={{ left: `${utilization}%` }}></div>
          </div>
        </div>
      </div>

      {/* Fleet Status Board */}
      <div className="status-board-grid">
        <div className="status-board">
          <div className="board-header">
            <h3>Fleet Status Distribution</h3>
            <div className="board-total">{totalAGVs} Total Units</div>
          </div>
          <div className="status-categories">
            <div className="status-category status-active">
              <div className="category-icon">▶</div>
              <div className="category-info">
                <div className="category-label">Active</div>
                <div className="category-value">{fleetStats.active || 0}</div>
              </div>
              <div className="category-bar">
                <div className="bar-fill" style={{ width: `${(fleetStats.active / totalAGVs) * 100}%` }}></div>
              </div>
            </div>

            <div className="status-category status-idle">
              <div className="category-icon">⏸</div>
              <div className="category-info">
                <div className="category-label">Idle</div>
                <div className="category-value">{fleetStats.idle || 0}</div>
              </div>
              <div className="category-bar">
                <div className="bar-fill" style={{ width: `${(fleetStats.idle / totalAGVs) * 100}%` }}></div>
              </div>
            </div>

            <div className="status-category status-charging">
              <div className="category-icon">🔋</div>
              <div className="category-info">
                <div className="category-label">Charging</div>
                <div className="category-value">{fleetStats.charging || 0}</div>
              </div>
              <div className="category-bar">
                <div className="bar-fill" style={{ width: `${(fleetStats.charging / totalAGVs) * 100}%` }}></div>
              </div>
            </div>

            <div className="status-category status-maintenance">
              <div className="category-icon">🔧</div>
              <div className="category-info">
                <div className="category-label">Maintenance</div>
                <div className="category-value">{fleetStats.maintenance || 0}</div>
              </div>
              <div className="category-bar">
                <div className="bar-fill" style={{ width: `${(fleetStats.maintenance / totalAGVs) * 100}%` }}></div>
              </div>
            </div>

            <div className="status-category status-error">
              <div className="category-icon">⚠</div>
              <div className="category-info">
                <div className="category-label">Error</div>
                <div className="category-value">{fleetStats.error || 0}</div>
              </div>
              <div className="category-bar">
                <div className="bar-fill" style={{ width: `${(fleetStats.error / totalAGVs) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="alerts-panel">
          <div className="board-header">
            <h3>Active Alerts</h3>
            <span className="alert-count">{recentIncidents.length}</span>
          </div>
          <div className="alerts-list">
            {recentIncidents.length > 0 ? (
              recentIncidents.map((incident, index) => (
                <div key={index} className={`alert-item alert-${incident.severity}`}>
                  <div className="alert-icon">
                    {incident.severity === 'high' ? '🔴' : incident.severity === 'medium' ? '🟡' : '🟢'}
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">{incident.type}</div>
                    <div className="alert-description">AGV-{incident.agvId} - {incident.description}</div>
                    <div className="alert-time">{incident.timestamp}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-alerts">
                <div className="no-alerts-icon">✓</div>
                <div>All systems normal</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Live AGV Grid */}
      <div className="agv-grid-section">
        <div className="board-header">
          <h3>Live AGV Status Grid</h3>
          <div className="grid-filter">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Active</button>
            <button className="filter-btn">Issues</button>
          </div>
        </div>
        <div className="agv-grid">
          {agvList.slice(0, 10).map((agv) => (
            <div key={agv.id} className={`agv-tile agv-tile-${agv.status}`}>
              <div className="agv-tile-header">
                <span className="agv-tile-id">{agv.id}</span>
                <span className={`agv-tile-status status-${agv.status}`}></span>
              </div>
              <div className="agv-tile-type">{agv.type}</div>
              <div className="agv-tile-battery">
                <div className="battery-icon">
                  <div className="battery-level" style={{ width: `${agv.batteryLevel}%` }}></div>
                </div>
                <span>{agv.batteryLevel}%</span>
              </div>
              <div className="agv-tile-location">{agv.currentLocation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetCommandCenter;
