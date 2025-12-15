# AGV Dashboard - React Application

An interactive React-based dashboard for visualizing AGV (Automated Guided Vehicle) operational data, performance metrics, and fleet management insights.

## Features

### 📊 Interactive Charts
- **Fleet Status Overview** - Real-time status distribution (Pie Chart)
- **AGV Type Distribution** - Fleet composition breakdown (Doughnut Chart)
- **Task Completion Tracking** - Daily performance metrics (Bar Chart)
- **Battery Level Monitoring** - Individual AGV battery status (Horizontal Bar Chart)
- **Performance Metrics** - Multi-metric trend analysis (Line Chart)
- **Navigation Heatmap** - Traffic density visualization (D3.js)
- **Utilization Timeline** - AGV activity Gantt chart (D3.js)

### 🎯 Key Features
- **Interactive Tooltips**: Hover over any chart element to see detailed information
- **Dynamic Popups**: Click on D3.js visualizations for comprehensive data
- **Multiple Views**: Switch between Overview, Performance, and Navigation views
- **Real-time KPIs**: Track total AGVs, utilization rate, battery levels, and tasks
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Static Data Source**: Uses markdown file as a lightweight database

## Technology Stack

- **React**: UI framework (Create React App)
- **Chart.js**: Standard charts (Pie, Bar, Line, Doughnut)
- **D3.js**: Advanced custom visualizations (Heatmap, Gantt)
- **react-chartjs-2**: React wrapper for Chart.js
- **gray-matter**: Markdown frontmatter parsing

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
