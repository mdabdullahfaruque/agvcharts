import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AGVTypeChart = ({ data }) => {
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
        text: 'AGV Type Distribution',
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
            
            let description = '';
            switch(label) {
              case 'Tow AGVs':
                description = 'Specialized in pulling carts and trailers';
                break;
              case 'Unit Load AGVs':
                description = 'Designed for pallet and container transport';
                break;
              case 'Forklift AGVs':
                description = 'Autonomous forklift operations';
                break;
              case 'Assembly Line AGVs':
                description = 'Moving products between assembly stations';
                break;
              case 'Heavy-load AGVs':
                description = 'Handling very large or heavy items';
                break;
              default:
                description = '';
            }
            
            return [
              `${label}: ${value} units`,
              `Percentage: ${percentage}%`,
              `Purpose: ${description}`
            ];
          },
          title: function(context) {
            return `AGV Type: ${context[0].label}`;
          },
          afterBody: function() {
            return '\nClick for more details';
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
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Fleet composition by AGV type and specialty.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Why is it important?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Shows fleet diversity and helps plan resource allocation based on task requirements.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Data shown:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#64748b' }}>
            <li>Tow AGVs: Pull carts and trailers</li>
            <li>Unit Load AGVs: Transport pallets/containers</li>
            <li>Forklift AGVs: Autonomous forklifts</li>
            <li>Assembly Line AGVs: Move between stations</li>
            <li>Heavy-load AGVs: Handle large items</li>
          </ul>
        </div>
      )}
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AGVTypeChart;
