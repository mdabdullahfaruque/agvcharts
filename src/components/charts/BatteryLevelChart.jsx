import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BatteryLevelChart = ({ data }) => {
  const [infoExpanded, setInfoExpanded] = useState(false);
  
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.8,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'AGV Battery Levels',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const value = context.parsed.x;
            let status = '';
            let recommendation = '';
            
            if (value < 20) {
              status = 'CRITICAL - Immediate charging required';
              recommendation = 'Route to nearest charging station';
            } else if (value < 50) {
              status = 'LOW - Charging recommended';
              recommendation = 'Schedule charging soon';
            } else if (value < 80) {
              status = 'GOOD - Operational';
              recommendation = 'Continue normal operations';
            } else {
              status = 'EXCELLENT - Fully charged';
              recommendation = 'Ready for extended operations';
            }
            
            return [
              `Battery Level: ${value}%`,
              `Status: ${status}`,
              `Recommendation: ${recommendation}`
            ];
          },
          title: function(context) {
            return `AGV: ${context[0].label}`;
          },
          afterBody: function(context) {
            const value = context[0].parsed.x;
            const estimatedRuntime = Math.floor(value * 0.8); // Rough estimate: 80 minutes per 100%
            return `\nEstimated Runtime: ${estimatedRuntime} minutes`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Battery Level (%)',
          font: {
            size: 13,
            weight: 'bold'
          }
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'AGV Name',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: true
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-info-toggle" onClick={() => setInfoExpanded(!infoExpanded)} style={{
        cursor: 'pointer', padding: '8px 12px', background: '#f1f5f9', borderRadius: '6px',
        marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: '#475569'
      }}>
        {infoExpanded ? '▼' : '▶'} Chart Information
      </div>
      {infoExpanded && (
        <div className="chart-info-panel" style={{
          background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px',
          border: '1px solid #e2e8f0', fontSize: '13px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>What is this?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Current battery levels for individual AGVs in the fleet.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Why is it important?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Monitors power status to prevent operational disruptions and schedule charging efficiently.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Data shown:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#64748b' }}>
            <li>Battery percentage (0-100%)</li>
            <li>Color coding: Red (&lt;20%), Yellow (20-50%), Green (&gt;50%)</li>
            <li>Individual AGV names and IDs</li>
          </ul>
        </div>
      )}
      <Bar data={data} options={options} />
    </div>
  );
};

export default BatteryLevelChart;
