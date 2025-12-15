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

const TaskCompletionChart = ({ data }) => {
  const [infoExpanded, setInfoExpanded] = useState(false);
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Daily Task Completion',
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
            const value = context.parsed.y;
            
            // Calculate success rate for completed tasks
            if (label === 'Completed Tasks') {
              const dataIndex = context.dataIndex;
              const completed = context.parsed.y;
              const planned = data.datasets.find(d => d.label === 'Planned Tasks').data[dataIndex];
              const successRate = ((completed / planned) * 100).toFixed(1);
              return [
                `${label}: ${value} tasks`,
                `Success Rate: ${successRate}%`,
                `Planned: ${planned} tasks`
              ];
            }
            
            return `${label}: ${value} tasks`;
          },
          title: function(context) {
            return `Date: ${context[0].label}`;
          },
          afterBody: function(context) {
            const dataIndex = context[0].dataIndex;
            const completed = data.datasets.find(d => d.label === 'Completed Tasks').data[dataIndex];
            const failed = data.datasets.find(d => d.label === 'Failed Tasks').data[dataIndex];
            const total = completed + failed;
            const efficiency = ((completed / total) * 100).toFixed(1);
            return `\nOverall Efficiency: ${efficiency}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Tasks',
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
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Daily task completion performance over the past week.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Why is it important?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Tracks productivity trends, success rates, and helps identify patterns in task completion efficiency.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Data shown:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#64748b' }}>
            <li>Completed Tasks: Successfully finished tasks per day</li>
            <li>Failed Tasks: Tasks that encountered errors</li>
            <li>Planned Tasks: Target tasks scheduled (line chart)</li>
          </ul>
        </div>
      )}
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskCompletionChart;
