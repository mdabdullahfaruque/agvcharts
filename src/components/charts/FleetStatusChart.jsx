import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FleetStatusChart = ({ data }) => {
  const [infoExpanded, setInfoExpanded] = useState(false);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Fleet Status Overview',
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
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return [
              `${label}: ${value} AGVs`,
              `Percentage: ${percentage}%`,
              `Total Fleet: ${total} AGVs`
            ];
          },
          title: function(context) {
            return `AGV Status: ${context[0].label}`;
          }
        }
      }
    },
    interaction: {
      mode: 'nearest',
      intersect: true
    },
    animation: {
      animateRotate: true,
      animateScale: true
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
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Distribution of AGV fleet by current operational status.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Why is it important?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Shows real-time fleet availability and helps identify operational bottlenecks or maintenance needs.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Data shown:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#64748b' }}>
            <li>Active: AGVs currently performing tasks</li>
            <li>Idle: AGVs available but not assigned</li>
            <li>Charging: AGVs at charging stations</li>
            <li>Maintenance: AGVs undergoing service</li>
            <li>Error: AGVs with faults requiring attention</li>
          </ul>
        </div>
      )}
      <Pie data={data} options={options} />
    </div>
  );
};

export default FleetStatusChart;
