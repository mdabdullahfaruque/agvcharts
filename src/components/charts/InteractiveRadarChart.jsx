import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './InteractiveRadarChart.css';

const InteractiveRadarChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [selectedMetric, setSelectedMetric] = useState(null);

  useEffect(() => {
    if (!data) return;

    const metrics = [
      { name: 'Active AGVs', value: data.fleetSummary?.active || 0, max: data.totalAGVs || 70, color: '#3b82f6', icon: '🤖' },
      { name: 'Efficiency', value: data.performanceMetrics?.[data.performanceMetrics.length - 1]?.fleetUtilization || 0, max: 100, color: '#22c55e', icon: '⚡' },
      { name: 'Battery Avg', value: Math.round(data.fleet?.reduce((sum, agv) => sum + agv.batteryLevel, 0) / (data.fleet?.length || 1)) || 0, max: 100, color: '#f59e0b', icon: '🔋' },
      { name: 'Task Rate', value: Math.round((data.taskHistory?.[0]?.completed || 0) / 10), max: 100, color: '#8b5cf6', icon: '📊' },
      { name: 'Uptime', value: 95, max: 100, color: '#10b981', icon: '⏱️' },
      { name: 'Response', value: 88, max: 100, color: '#06b6d4', icon: '⚙️' }
    ];

    const width = 400;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 60;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    // Create radial scale
    const angleScale = d3.scaleLinear()
      .domain([0, metrics.length])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, maxRadius]);

    // Draw background circles
    const circles = [20, 40, 60, 80, 100];
    g.selectAll('.grid-circle')
      .data(circles)
      .join('circle')
      .attr('class', 'grid-circle')
      .attr('r', d => radiusScale(d))
      .attr('fill', 'none')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,4');

    // Draw radial lines
    metrics.forEach((_, i) => {
      const angle = angleScale(i) - Math.PI / 2;
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', Math.cos(angle) * maxRadius)
        .attr('y2', Math.sin(angle) * maxRadius)
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1);
    });

    // Draw data bars with animation
    metrics.forEach((metric, i) => {
      const angle = angleScale(i) - Math.PI / 2;
      const percentage = (metric.value / metric.max) * 100;
      const barRadius = radiusScale(percentage);
      
      const barWidth = 30;
      const startAngle = angle - (barWidth / 2) * (Math.PI / 180);
      const endAngle = angle + (barWidth / 2) * (Math.PI / 180);

      // Create arc path
      const arc = d3.arc()
        .innerRadius(30)
        .outerRadius(30)
        .startAngle(startAngle)
        .endAngle(endAngle);

      const arcFinal = d3.arc()
        .innerRadius(30)
        .outerRadius(barRadius)
        .startAngle(startAngle)
        .endAngle(endAngle);

      // Animated bar
      const path = g.append('path')
        .attr('d', arc)
        .attr('fill', metric.color)
        .attr('opacity', 0.8)
        .attr('class', 'metric-bar')
        .style('cursor', 'pointer')
        .on('mouseenter', function(event) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', 1)
            .attr('d', d3.arc()
              .innerRadius(30)
              .outerRadius(barRadius + 10)
              .startAngle(startAngle)
              .endAngle(endAngle));

          setSelectedMetric(metric);
          
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style('display', 'block')
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`)
            .html(`
              <div class="tooltip-header">${metric.icon} ${metric.name}</div>
              <div class="tooltip-value">${metric.value} / ${metric.max}</div>
              <div class="tooltip-percentage">${percentage.toFixed(1)}%</div>
            `);
        })
        .on('mousemove', function(event) {
          d3.select(tooltipRef.current)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 10}px`);
        })
        .on('mouseleave', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', 0.8)
            .attr('d', arcFinal);

          d3.select(tooltipRef.current).style('display', 'none');
          setSelectedMetric(null);
        });

      // Animate the bar growing
      path.transition()
        .duration(1500)
        .delay(i * 100)
        .attr('d', arcFinal);

      // Add labels
      const labelAngle = angle;
      const labelRadius = maxRadius + 40;
      const labelX = Math.cos(labelAngle) * labelRadius;
      const labelY = Math.sin(labelAngle) * labelRadius;

      g.append('text')
        .attr('x', labelX)
        .attr('y', labelY)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('class', 'metric-label')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', metric.color)
        .text(metric.icon);

      g.append('text')
        .attr('x', labelX)
        .attr('y', labelY + 15)
        .attr('text-anchor', 'middle')
        .attr('class', 'metric-label-text')
        .style('font-size', '10px')
        .style('fill', '#64748b')
        .text(metric.name.split(' ')[0]);
    });

    // Center circle with animation
    const centerGroup = g.append('g')
      .attr('class', 'center-group');

    centerGroup.append('circle')
      .attr('r', 0)
      .attr('fill', 'url(#gradient)')
      .transition()
      .duration(1000)
      .attr('r', 25);

    // Add gradient
    const defs = svg.append('defs');
    const gradient = defs.append('radialGradient')
      .attr('id', 'gradient');
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#667eea');
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#764ba2');

    // Center text
    centerGroup.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'center-text')
      .style('font-size', '24px')
      .style('font-weight', '700')
      .style('fill', 'white')
      .text('AGV')
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .delay(500)
      .attr('opacity', 1);

  }, [data]);

  return (
    <div className="interactive-radar-chart">
      <div className="chart-header">
        <h3>Fleet Performance Radar</h3>
        <div className="live-pulse">● LIVE</div>
      </div>
      <div className="chart-container">
        <svg ref={svgRef}></svg>
      </div>
      <div ref={tooltipRef} className="d3-tooltip"></div>
      {selectedMetric && (
        <div className="metric-details">
          <div className="detail-icon">{selectedMetric.icon}</div>
          <div className="detail-info">
            <div className="detail-name">{selectedMetric.name}</div>
            <div className="detail-value">{selectedMetric.value} / {selectedMetric.max}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveRadarChart;
