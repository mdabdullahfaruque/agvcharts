/**
 * Parse AGV data - now just returns JSON directly
 * @param {object} jsonData - Parsed JSON data
 * @returns {object} AGV data
 */
export const parseAGVData = (jsonData) => {
  return jsonData;
};

/**
 * Get fleet status summary for pie chart
 */
export const getFleetStatusData = (data) => {
  const summary = data.fleetSummary;
  return {
    labels: ['Active', 'Idle', 'Charging', 'Maintenance', 'Error'],
    datasets: [{
      data: [
        summary.active,
        summary.idle,
        summary.charging,
        summary.maintenance,
        summary.error
      ],
      backgroundColor: [
        '#10b981', // Green - Active
        '#f59e0b', // Yellow - Idle
        '#3b82f6', // Blue - Charging
        '#8b5cf6', // Purple - Maintenance
        '#ef4444'  // Red - Error
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };
};

/**
 * Get AGV type distribution for doughnut chart
 */
export const getAGVTypeDistribution = (data) => {
  const types = data.agvTypeDistribution;
  return {
    labels: ['Tow AGVs', 'Unit Load AGVs', 'Forklift AGVs', 'Assembly Line AGVs', 'Heavy-load AGVs'],
    datasets: [{
      data: [
        types.tow,
        types.unit_load,
        types.forklift,
        types.assembly_line,
        types.heavy_load
      ],
      backgroundColor: [
        '#06b6d4', // Cyan
        '#8b5cf6', // Purple
        '#ec4899', // Pink
        '#f59e0b', // Amber
        '#10b981'  // Green
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };
};

/**
 * Get task history for bar chart
 */
export const getTaskHistoryData = (data) => {
  const history = data.taskHistory;
  return {
    labels: history.map(h => h.date),
    datasets: [
      {
        label: 'Completed Tasks',
        data: history.map(h => h.completedTasks),
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 1
      },
      {
        label: 'Failed Tasks',
        data: history.map(h => h.failedTasks),
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        borderWidth: 1
      },
      {
        label: 'Planned Tasks',
        data: history.map(h => h.plannedTasks),
        backgroundColor: '#94a3b8',
        borderColor: '#64748b',
        borderWidth: 1,
        type: 'line'
      }
    ]
  };
};

/**
 * Get battery levels for horizontal bar chart
 */
export const getBatteryLevelData = (data) => {
  const fleet = data.fleet.slice(0, 10); // Top 10 AGVs
  return {
    labels: fleet.map(agv => agv.name),
    datasets: [{
      label: 'Battery Level (%)',
      data: fleet.map(agv => agv.batteryLevel),
      backgroundColor: fleet.map(agv => {
        if (agv.batteryLevel < 20) return '#ef4444'; // Red
        if (agv.batteryLevel < 50) return '#f59e0b'; // Yellow
        return '#10b981'; // Green
      }),
      borderWidth: 1,
      borderColor: '#e5e7eb'
    }]
  };
};

/**
 * Get performance metrics for line chart
 */
export const getPerformanceMetricsData = (data) => {
  const metrics = data.performanceMetrics;
  return {
    labels: metrics.map(m => m.date),
    datasets: [
      {
        label: 'Fleet Utilization (%)',
        data: metrics.map(m => m.fleetUtilization),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Average Completion Time (min)',
        data: metrics.map(m => m.averageCompletionTime),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Downtime (%)',
        data: metrics.map(m => m.downtime),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };
};

/**
 * Get navigation heatmap data
 */
export const getNavigationHeatmapData = (data) => {
  return data.navigationHeatmap;
};

/**
 * Get utilization timeline data for Gantt chart
 */
export const getUtilizationTimelineData = (data) => {
  return data.utilizationTimeline;
};

/**
 * Get incidents data
 */
export const getIncidentsData = (data) => {
  return data.incidents;
};

/**
 * Get cost analysis data
 */
export const getCostAnalysisData = (data) => {
  const costs = data.costAnalysis;
  return {
    labels: costs.map(c => c.month),
    datasets: [
      {
        label: 'Labor Cost Savings',
        data: costs.map(c => c.laborCostSavings),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Energy Costs',
        data: costs.map(c => c.energyCosts),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Maintenance Costs',
        data: costs.map(c => c.maintenanceCosts),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false
      }
    ]
  };
};

/**
 * Format time from minutes to HH:MM
 */
export const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};
