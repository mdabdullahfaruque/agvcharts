import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PerformanceChart = ({ data }) => {
  const [infoExpanded, setInfoExpanded] = useState(false);
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          font: {
            size: 12
          },
          usePointStyle: true
        }
      },
      title: {
        display: true,
        text: 'Performance Metrics Over Time',
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
            const label = context.dataset.label || '';
            const value = context.parsed.y.toFixed(1);
            
            let unit = '';
            let insight = '';
            
            if (label.includes('Utilization')) {
              unit = '%';
              insight = value > 80 ? 'Excellent utilization' : 
                       value > 70 ? 'Good utilization' : 'Needs improvement';
            } else if (label.includes('Completion Time')) {
              unit = ' min';
              insight = value < 9 ? 'Efficient performance' : 
                       value < 10 ? 'Acceptable performance' : 'Below target';
            } else if (label.includes('Downtime')) {
              unit = '%';
              insight = value < 2 ? 'Excellent uptime' : 
                       value < 3 ? 'Good uptime' : 'Requires attention';
            }
            
            return [
              `${label}: ${value}${unit}`,
              `Assessment: ${insight}`
            ];
          },
          title: function(context) {
            return `Date: ${context[0].label}`;
          },
          afterBody: function(context) {
            const dataIndex = context[0].dataIndex;
            const datasets = context[0].chart.data.datasets;
            
            const utilization = datasets[0].data[dataIndex];
            const completionTime = datasets[1].data[dataIndex];
            const downtime = datasets[2].data[dataIndex];
            
            const overallScore = (
              (utilization / 100) * 40 + 
              (Math.max(0, 15 - completionTime) / 15) * 30 + 
              ((5 - downtime) / 5) * 30
            ).toFixed(1);
            
            return `\nOverall Performance Score: ${overallScore}/100`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Metric Value',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 13,
            weight: 'bold'
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
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
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Key performance indicators tracked over time.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Why is it important?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Identifies trends, measures efficiency improvements, and highlights areas needing attention.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Data shown:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#64748b' }}>
            <li>Fleet Utilization: Percentage of fleet actively working</li>
            <li>Avg Completion Time: Minutes per task</li>
            <li>Downtime: Percentage of time fleet is unavailable</li>
          </ul>
        </div>
      )}
      <Line data={data} options={options} />
    </div>
  );
};

export default PerformanceChart;
