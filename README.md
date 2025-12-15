# AGV Dashboard

An interactive dashboard for visualizing AGV (Automated Guided Vehicle) operational data, performance metrics, and fleet management insights.

## 📖 User Guide

### Getting Started
Visit the live dashboard at: **https://mdabdullahfaruque.github.io/agvcharts/**

### Navigation

The dashboard has **4 main views** accessible via the navigation buttons at the top:

#### 🎯 Command Center (Default View)
- **Real-time KPI cards** showing Active AGVs, Fleet Efficiency, Tasks Completed, and Utilization
- **Fleet Status Distribution** with animated progress bars
- **Interactive D3.js Radar Chart** - Hover over the colored bars to see detailed metrics
- **Live AGV Status Grid** showing individual vehicle status, battery levels, and locations

#### 📈 Overview
- **Fleet Status** pie chart showing distribution of AGV states
- **AGV Type Distribution** doughnut chart
- **Task Completion** bar chart with daily performance
- **Battery Levels** horizontal bar chart with color-coded levels

#### ⚡ Performance
- **Performance Metrics** line chart tracking utilization, completion time, and downtime
- **Utilization Timeline** Gantt chart showing AGV activity throughout the day

#### 🗺️ Navigation
- **Navigation Heatmap** showing traffic density across different zones
- **Battery Levels** and **Fleet Status** quick reference charts

### Interactive Features

**Hover Effects:**
- Hover over any chart element to see detailed tooltips
- Charts display additional information like percentages, counts, and recommendations

**Collapsible Info Panels:**
- Click the ▶/▼ arrows on charts to expand/collapse detailed information
- Each chart includes explanations and insights

**D3.js Radar Chart (Command Center):**
- Hover over the radial bars to see them grow and change color
- Real-time tooltips show exact values and percentages
- The center displays the currently selected metric

**Color Indicators:**
- 🟢 Green: Good/Optimal status
- 🟡 Yellow: Warning/Attention needed
- 🔴 Red: Critical/Low levels
- 🔵 Blue: Active/In operation

### Key Metrics Explained

- **Active AGVs**: Number of AGVs currently performing tasks
- **Fleet Efficiency**: Overall productivity percentage of the fleet
- **Tasks Completed**: Daily task completion count
- **Fleet Utilization**: Percentage of fleet capacity being used
- **Battery Levels**: Individual AGV battery status with runtime estimates
- **Navigation Heatmap**: Shows high-traffic and congestion areas

### Tips
- The Command Center view is designed for live monitoring and quick status checks
- Use Overview for detailed breakdowns of fleet composition
- Performance view is ideal for trend analysis
- Navigation view helps identify traffic patterns and potential bottlenecks

## Technologies Used

This project is created using:
- HTML
- CSS
- JavaScript
- D3.js
- Chart.js
