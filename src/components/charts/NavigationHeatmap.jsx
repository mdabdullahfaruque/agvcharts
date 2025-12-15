import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './NavigationHeatmap.css';

const NavigationHeatmap = ({ data }) => {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  const [infoExpanded, setInfoExpanded] = useState(false);

  useEffect(() => {
    if (!data || !data.trafficData) return;

    const width = 800;
    const height = 600;
    const margin = { top: 40, right: 20, bottom: 40, left: 60 };

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', '#ffffff')
      .style('border-radius', '8px');

    // Title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#1e293b')
      .text('Navigation Traffic Heatmap');

    // Scale for colors - improved contrast (reverse for better visibility)
    const colorScale = d3.scaleSequential()
      .domain([d3.max(data.trafficData, d => d.intensity), 0])
      .interpolator(d3.interpolateRdYlGn);

    // Scale for positioning
    const xScale = d3.scaleLinear()
      .domain([0, data.facilityDimensions.width])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, data.facilityDimensions.height])
      .range([margin.top, height - margin.bottom]);

    // Create grid cells
    const cells = svg.selectAll('rect.cell')
      .data(data.trafficData)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y))
      .attr('width', data.gridSize)
      .attr('height', data.gridSize)
      .attr('fill', d => colorScale(d.intensity))
      .attr('opacity', 0.9)
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer');

    // Add interactivity
    cells
      .on('mouseenter', function(event, d) {
        // Highlight cell
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .attr('stroke-width', 2)
          .attr('stroke', '#1e293b');

        // Show tooltip
        setTooltip({
          show: true,
          content: {
            position: `X: ${d.x}, Y: ${d.y}`,
            intensity: d.intensity,
            traffic: d.intensity > 90 ? 'Very High' : 
                    d.intensity > 70 ? 'High' : 
                    d.intensity > 50 ? 'Medium' : 'Low',
            recommendation: d.intensity > 90 ? 'Consider traffic optimization' : 
                           d.intensity > 70 ? 'Monitor for congestion' : 
                           'Normal traffic flow'
          },
          x: event.pageX,
          y: event.pageY
        });
      })
      .on('mousemove', (event) => {
        setTooltip(prev => ({
          ...prev,
          x: event.pageX,
          y: event.pageY
        }));
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.7)
          .attr('stroke-width', 0.5)
          .attr('stroke', '#ffffff');

        setTooltip({ show: false, content: '', x: 0, y: 0 });
      });

    // Add color legend
    const legendWidth = 200;
    const legendHeight = 20;
    
    const legendScale = d3.scaleLinear()
      .domain([0, d3.max(data.trafficData, d => d.intensity)])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5)
      .tickFormat(d => `${d}`);

    const legend = svg.append('g')
      .attr('transform', `translate(${width - legendWidth - 30}, ${height - 25})`);

    // Create gradient for legend
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
      .attr('id', 'heatmap-gradient');

    gradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .enter()
      .append('stop')
      .attr('offset', d => `${d * 100}%`)
      .attr('stop-color', d => colorScale(d * d3.max(data.trafficData, d => d.intensity)));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .style('fill', 'url(#heatmap-gradient)');

    legend.append('g')
      .attr('transform', `translate(0, ${legendHeight})`)
      .call(legendAxis)
      .selectAll('text')
      .style('font-size', '10px');

    legend.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text('Traffic Intensity');

  }, [data]);

  return (
    <div className="heatmap-wrapper" style={{ position: 'relative' }}>
      <div className="chart-info-toggle" onClick={() => setInfoExpanded(!infoExpanded)} style={{
        cursor: 'pointer',
        padding: '8px 12px',
        background: '#f1f5f9',
        borderRadius: '6px',
        marginBottom: '12px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#475569'
      }}>
        {infoExpanded ? '▼' : '▶'} Chart Information
      </div>
      {infoExpanded && (
        <div className="chart-info-panel" style={{
          background: '#f8fafc',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: '1px solid #e2e8f0',
          fontSize: '13px'
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>What is this?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>A heatmap showing AGV traffic density across the facility floor.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Why is it important?</h4>
          <p style={{ margin: '0 0 12px 0', color: '#64748b' }}>Identifies high-traffic zones, potential congestion points, and helps optimize AGV routing and facility layout.</p>
          <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Data shown:</h4>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#64748b' }}>
            <li>Traffic intensity values (0-100)</li>
            <li>Facility grid positions (X, Y coordinates)</li>
            <li>Color-coded density (red = high traffic, yellow = medium, green = low traffic)</li>
          </ul>
        </div>
      )}
      <svg ref={svgRef}></svg>
      
      {tooltip.show && (
        <div 
          className="heatmap-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x + 15,
            top: tooltip.y - 10,
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>
            Traffic Zone Details
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>Position:</strong> {tooltip.content.position}
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>Intensity:</strong> {tooltip.content.intensity}/100
          </div>
          <div style={{ marginBottom: '4px' }}>
            <strong>Traffic Level:</strong> {tooltip.content.traffic}
          </div>
          <div style={{ 
            marginTop: '8px', 
            paddingTop: '8px', 
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            fontStyle: 'italic'
          }}>
            {tooltip.content.recommendation}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationHeatmap;
