# AGV Dashboard Documentation

## Project Overview

This project provides an interactive React-based dashboard for visualizing AGV (Automated Guided Vehicle) operational data, performance metrics, and fleet management insights. The dashboard uses D3.js and Chart.js to create dynamic, responsive visualizations based on static AGV data.

---

## Table of Contents

1. [AGV Background](#agv-background)
2. [Dashboard Purpose](#dashboard-purpose)
3. [Chart Types & Visualizations](#chart-types--visualizations)
4. [Data Structure](#data-structure)
5. [Technology Stack](#technology-stack)
6. [Implementation Roadmap](#implementation-roadmap)

---

## AGV Background

### What is an AGV?

An **Automated Guided Vehicle (AGV)** is a mobile robot used to transport materials automatically within facilities like factories, warehouses, hospitals, and ports. Unlike manual forklifts or carts, AGVs follow predefined paths or navigation rules with minimal human intervention.

### Core Components

- **Vehicle body**: Frame, wheels, drive motors
- **Navigation system**: Guides movement (magnetic tape, lasers, vision)
- **Controller/software**: Routing, task scheduling, traffic control
- **Sensors**: Safety systems (LiDAR, bumpers, ultrasonic, cameras)
- **Power system**: Batteries (lead-acid, Li-ion), auto-charging
- **Communication**: Wi-Fi/industrial networks for fleet management

### Common AGV Types

1. **Tow AGVs** – Pull carts or trailers
2. **Unit Load AGVs** – Carry pallets or containers
3. **Forklift AGVs** – Autonomous forklifts
4. **Assembly Line AGVs** – Move products between stations
5. **Heavy-load AGVs** – Transport very large or heavy items

### Navigation Methods

**Fixed-path:**
- Magnetic tape or wire
- QR codes / floor markers

**Free-navigation:**
- Laser (LiDAR) SLAM
- Vision-based navigation
- Natural feature navigation

### Key Advantages

- Improved safety
- Consistent and predictable operation
- Reduced labor costs
- Scalable for 24/7 operations
- Better material flow and traceability

---

## Dashboard Purpose

The AGV Dashboard aims to provide:

1. **Real-time Fleet Overview**: Monitor the status of all AGVs in the facility
2. **Performance Metrics**: Track efficiency, uptime, and task completion rates
3. **Navigation Analysis**: Visualize AGV routes and traffic patterns
4. **Battery & Maintenance**: Monitor power levels and maintenance schedules
5. **Utilization Statistics**: Identify underutilized vehicles and optimize fleet size
6. **Safety Metrics**: Track incidents, near-misses, and safety compliance

---

## Chart Types & Visualizations

### 1. Fleet Status Overview (Pie Chart - Chart.js)
**Purpose**: Show current status distribution of all AGVs
- Active/Working
- Idle/Standby
- Charging
- Maintenance
- Error/Fault

### 2. AGV Type Distribution (Doughnut Chart - Chart.js)
**Purpose**: Display fleet composition by AGV type
- Tow AGVs
- Unit Load AGVs
- Forklift AGVs
- Assembly Line AGVs
- Heavy-load AGVs

### 3. Daily Task Completion (Bar Chart - Chart.js)
**Purpose**: Track completed tasks over time
- X-axis: Date/Time
- Y-axis: Number of tasks completed
- Compare planned vs actual

### 4. Battery Levels Overview (Horizontal Bar Chart - Chart.js)
**Purpose**: Monitor battery status across fleet
- Individual AGV battery percentage
- Color-coded (Red: <20%, Yellow: 20-50%, Green: >50%)

### 5. Navigation Heatmap (D3.js)
**Purpose**: Visualize high-traffic areas and AGV paths
- Facility floor plan overlay
- Heat intensity showing traffic density
- Common routes and congestion points

### 6. AGV Utilization Timeline (Gantt Chart - D3.js)
**Purpose**: Show AGV activity over time
- Each row represents one AGV
- Time blocks showing: Active, Idle, Charging, Maintenance

### 7. Performance Metrics (Line Chart - Chart.js)
**Purpose**: Track key performance indicators over time
- Average task completion time
- Fleet utilization rate
- Downtime percentage
- Energy efficiency

### 8. Error/Incident Log (Table with Sparklines - D3.js)
**Purpose**: Track and visualize incidents
- Error types and frequency
- Affected AGVs
- Trend analysis

### 9. Navigation Method Usage (Stacked Area Chart - D3.js)
**Purpose**: Show adoption of different navigation technologies
- Fixed-path (magnetic tape, QR codes)
- Free-navigation (LiDAR, vision-based)

### 10. Cost Analysis (Multi-line Chart - Chart.js)
**Purpose**: Compare operational costs
- Labor cost savings
- Energy costs
- Maintenance costs
- ROI trends

---

## Data Structure

### AGV Fleet Data

```json
{
  "fleet": [
    {
      "id": "AGV-001",
      "name": "Tow Unit Alpha",
      "type": "tow",
      "status": "active",
      "batteryLevel": 87,
      "navigationMethod": "magnetic_tape",
      "currentTask": "Transport pallet to Station B",
      "location": { "x": 120, "y": 340 },
      "lastMaintenance": "2025-12-01",
      "nextMaintenance": "2026-01-01",
      "operatingHours": 1240,
      "tasksCompleted": 3450,
      "averageTaskTime": 8.5
    }
  ]
}
```

### Task History Data

```json
{
  "taskHistory": [
    {
      "date": "2025-12-15",
      "agvId": "AGV-001",
      "taskId": "TASK-12345",
      "type": "transport",
      "startTime": "08:15:00",
      "endTime": "08:23:30",
      "duration": 510,
      "status": "completed",
      "origin": "Warehouse A",
      "destination": "Assembly Line 3"
    }
  ]
}
```

### Performance Metrics Data

```json
{
  "metrics": {
    "daily": [
      {
        "date": "2025-12-15",
        "totalTasks": 145,
        "completedTasks": 142,
        "failedTasks": 3,
        "averageCompletionTime": 9.2,
        "fleetUtilization": 78.5,
        "downtime": 2.3,
        "energyConsumed": 245.6
      }
    ]
  }
}
```

### Navigation Heatmap Data

```json
{
  "heatmap": {
    "facilityDimensions": { "width": 1000, "height": 800 },
    "gridSize": 20,
    "trafficData": [
      { "x": 120, "y": 340, "intensity": 85 },
      { "x": 140, "y": 340, "intensity": 92 }
    ]
  }
}
```

### Error/Incident Data

```json
{
  "incidents": [
    {
      "id": "INC-001",
      "date": "2025-12-14",
      "time": "14:32:00",
      "agvId": "AGV-003",
      "type": "obstacle_detection",
      "severity": "low",
      "resolved": true,
      "resolutionTime": 5,
      "description": "Obstacle detected, route recalculated"
    }
  ]
}
```

---

## Technology Stack

### Frontend Framework
- **React**: Component-based UI development
- **React Hooks**: State management
- **React Router** (optional): Multi-page navigation

### Visualization Libraries

#### Chart.js
- **Use Cases**: Standard charts (bar, line, pie, doughnut)
- **Pros**: Easy to use, responsive, good documentation
- **Charts**: Fleet status, task completion, battery levels, performance metrics

#### D3.js
- **Use Cases**: Custom, complex visualizations
- **Pros**: Highly customizable, powerful data binding
- **Charts**: Navigation heatmap, Gantt timeline, network graphs

### Supporting Libraries
- **react-chartjs-2**: React wrapper for Chart.js
- **d3-scale, d3-shape, d3-axis**: D3.js modules
- **Tailwind CSS** or **Material-UI**: Styling
- **date-fns** or **moment.js**: Date manipulation

### Data Format
- **Markdown files**: Store static AGV data
- **gray-matter**: Parse frontmatter from MD files
- **marked** or **remark**: Markdown parsing

---

## Implementation Roadmap

### Phase 1: Project Setup
- [x] Create documentation
- [ ] Initialize React app (`create-react-app` or `vite`)
- [ ] Install dependencies (Chart.js, D3.js, react-chartjs-2)
- [ ] Set up project structure

### Phase 2: Data Layer
- [ ] Create MD files with AGV static data
- [ ] Implement data parsing utilities
- [ ] Create data access layer (hooks/services)
- [ ] Validate data structure

### Phase 3: Basic Charts (Chart.js)
- [ ] Fleet Status Overview (Pie Chart)
- [ ] AGV Type Distribution (Doughnut Chart)
- [ ] Daily Task Completion (Bar Chart)
- [ ] Battery Levels (Horizontal Bar)
- [ ] Performance Metrics (Line Chart)

### Phase 4: Advanced Visualizations (D3.js)
- [ ] Navigation Heatmap
- [ ] AGV Utilization Timeline (Gantt)
- [ ] Error/Incident Visualization
- [ ] Navigation Method Usage (Area Chart)

### Phase 5: Dashboard Layout
- [ ] Create responsive grid layout
- [ ] Implement filters and date pickers
- [ ] Add interactive tooltips
- [ ] Implement real-time updates (simulation)

### Phase 6: Polish & Optimization
- [ ] Add animations and transitions
- [ ] Optimize performance
- [ ] Add export functionality (PDF, PNG)
- [ ] Implement dark mode
- [ ] Add documentation and comments

---

## File Structure

```
agvcharts/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── FleetStatusChart.jsx
│   │   │   ├── TaskCompletionChart.jsx
│   │   │   ├── BatteryLevelChart.jsx
│   │   │   ├── NavigationHeatmap.jsx
│   │   │   ├── UtilizationGantt.jsx
│   │   │   └── PerformanceChart.jsx
│   │   ├── layout/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   └── common/
│   │       ├── Card.jsx
│   │       └── Tooltip.jsx
│   ├── data/
│   │   ├── fleet-data.md
│   │   ├── task-history.md
│   │   ├── performance-metrics.md
│   │   └── incidents.md
│   ├── utils/
│   │   ├── dataParser.js
│   │   └── chartHelpers.js
│   ├── hooks/
│   │   └── useAGVData.js
│   ├── App.jsx
│   └── index.js
├── AGV_DASHBOARD_DOCUMENTATION.md
├── package.json
└── README.md
```

---

## Chart.js Implementation Examples

### Fleet Status Pie Chart Configuration

```javascript
const fleetStatusConfig = {
  type: 'pie',
  data: {
    labels: ['Active', 'Idle', 'Charging', 'Maintenance', 'Error'],
    datasets: [{
      data: [45, 12, 8, 3, 2],
      backgroundColor: [
        '#10b981', // Green - Active
        '#f59e0b', // Yellow - Idle
        '#3b82f6', // Blue - Charging
        '#8b5cf6', // Purple - Maintenance
        '#ef4444'  // Red - Error
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Fleet Status Overview' }
    }
  }
};
```

---

## D3.js Implementation Examples

### Navigation Heatmap (Pseudocode)

```javascript
const createHeatmap = (data) => {
  const svg = d3.select('#heatmap')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const colorScale = d3.scaleSequential()
    .domain([0, d3.max(data, d => d.intensity)])
    .interpolator(d3.interpolateYlOrRd);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', gridSize)
    .attr('height', gridSize)
    .attr('fill', d => colorScale(d.intensity))
    .attr('opacity', 0.7);
};
```

---

## Static Data Files

All AGV data will be stored in markdown files within the `src/data/` directory. Each file will contain:

1. **Frontmatter**: Structured data in YAML format
2. **Content**: Human-readable descriptions and notes

### Example: fleet-data.md

```markdown
---
lastUpdated: "2025-12-15"
totalAGVs: 70
activeAGVs: 45
---

# AGV Fleet Data

This file contains the current status of all AGVs in the facility.

## Fleet Status Summary
- Total AGVs: 70
- Active: 45
- Idle: 12
- Charging: 8
- Maintenance: 3
- Error: 2
```

---

## Next Steps

1. **Initialize React Project**: Use Vite or Create React App
2. **Create Data Files**: Populate MD files with AGV data
3. **Build Components**: Start with simple Chart.js visualizations
4. **Integrate D3.js**: Add advanced custom charts
5. **Deploy**: Host on GitHub Pages, Netlify, or Vercel

---

## Additional Resources

- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [D3.js Documentation](https://d3js.org/)
- [React Documentation](https://react.dev/)
- [AGV Industry Standards](https://www.mhi.org/agv)

---

## License

MIT License - Open source project for AGV data visualization

---

**Last Updated**: December 15, 2025
**Version**: 1.0.0
**Author**: AGV Dashboard Team
