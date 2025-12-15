import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './UtilizationGantt.css';

const UtilizationGantt = ({ data }) => {
  const svgRef = useRef();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [infoExpanded, setInfoExpanded] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const width = 900;
    const height = 400;
    const margin = { top: 50, right: 150, bottom: 50, left: 150 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#f8fafc')
      .style('border-radius', '8px');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#1e293b')
      .text('AGV Utilization Timeline (Today)');

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Parse time
    const parseTime = d3.timeParse('%H:%M');
    const formatTime = d3.timeFormat('%H:%M');

    // Process data to include start and end times as Date objects
    const processedData = data.map(agv => ({
      ...agv,
      activities: agv.activities.map(activity => ({
        ...activity,
        start: parseTime(activity.startTime),
        end: parseTime(activity.endTime)
      }))
    }));

    // Scales
    const xScale = d3.scaleTime()
      .domain([parseTime('08:00'), parseTime('17:00')])
      .range([0, chartWidth]);

    const yScale = d3.scaleBand()
      .domain(processedData.map(d => d.agvName))
      .range([0, chartHeight])
      .padding(0.2);

    // Color mapping
    const colorMap = {
      'active': '#10b981',
      'idle': '#f59e0b',
      'charging': '#3b82f6',
      'maintenance': '#8b5cf6'
    };

    // Axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(9)
      .tickFormat(formatTime);

    const yAxis = d3.axisLeft(yScale);

    chart.append('g')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '11px');

    chart.append('g')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '11px')
      .style('font-weight', '500');

    // Grid lines
    chart.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisBottom(xScale)
        .ticks(9)
        .tickSize(chartHeight)
        .tickFormat('')
      );

    // Draw activity bars
    processedData.forEach(agv => {
      const bars = chart.selectAll(`.bar-${agv.agvId}`)
        .data(agv.activities)
        .enter()
        .append('rect')
        .attr('class', `activity-bar bar-${agv.agvId}`)
        .attr('x', d => xScale(d.start))
        .attr('y', yScale(agv.agvName))
        .attr('width', d => xScale(d.end) - xScale(d.start))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => colorMap[d.type])
        .attr('rx', 4)
        .attr('opacity', 0.8)
        .style('cursor', 'pointer')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1);

      // Add interactivity
      bars
        .on('mouseenter', function(event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', 1)
            .attr('stroke-width', 2)
            .attr('stroke', '#1e293b');

          setSelectedActivity({
            agvName: agv.agvName,
            agvId: agv.agvId,
            type: d.type,
            startTime: d.startTime,
            endTime: d.endTime,
            duration: d.duration,
            x: event.pageX,
            y: event.pageY
          });
        })
        .on('mousemove', (event) => {
          setSelectedActivity(prev => prev ? {
            ...prev,
            x: event.pageX,
            y: event.pageY
          } : null);
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', 0.8)
            .attr('stroke-width', 1)
            .attr('stroke', '#ffffff');

          setSelectedActivity(null);
        });
    });

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

    const legendItems = [
      { type: 'active', label: 'Active' },
      { type: 'idle', label: 'Idle' },
      { type: 'charging', label: 'Charging' },
      { type: 'maintenance', label: 'Maintenance' }
    ];

    legendItems.forEach((item, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`);

      legendRow.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', colorMap[item.type])
        .attr('rx', 3);

      legendRow.append('text')
        .attr('x', 25)
        .attr('y', 13)
        .style('font-size', '12px')
        .text(item.label);
    });

  }, [data]);

  return (
    <div className="gantt-wrapper" style={{ position: 'relative' }}>
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
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Timeline showing how each AGV spent its time today.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Why is it important?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Visualizes time allocation, identifies idle periods, and helps optimize AGV scheduling.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Data shown:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#64748b' }}>
            <li>Activity types: Active, Idle, Charging, Maintenance</li>
            <li>Time ranges: 8:00 AM to 5:00 PM</li>
            <li>Duration per activity in minutes</li>
          </ul>
        </div>
      )}
      <svg ref={svgRef}></svg>
      
      {selectedActivity && (
        <div 
          className="gantt-popup"
          style={{
            position: 'fixed',
            left: selectedActivity.x + 15,
            top: selectedActivity.y - 10,
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '8px',
            fontSize: '13px',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            minWidth: '250px'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '15px', color: '#60a5fa' }}>
            {selectedActivity.agvName}
          </div>
          <div style={{ marginBottom: '6px' }}>
            <strong>Activity:</strong> {selectedActivity.type.charAt(0).toUpperCase() + selectedActivity.type.slice(1)}
          </div>
          <div style={{ marginBottom: '6px' }}>
            <strong>Start Time:</strong> {selectedActivity.startTime}
          </div>
          <div style={{ marginBottom: '6px' }}>
            <strong>End Time:</strong> {selectedActivity.endTime}
          </div>
          <div style={{ marginBottom: '6px' }}>
            <strong>Duration:</strong> {selectedActivity.duration} minutes
          </div>
          <div style={{ 
            marginTop: '10px', 
            paddingTop: '10px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '12px',
            color: '#94a3b8'
          }}>
            AGV ID: {selectedActivity.agvId}
          </div>
          <div style={{ 
            marginTop: '8px',
            fontSize: '11px',
            fontStyle: 'italic',
            color: '#cbd5e1'
          }}>
            Click for detailed activity log
          </div>
        </div>
      )}
    </div>
  );
};

export default UtilizationGantt;
