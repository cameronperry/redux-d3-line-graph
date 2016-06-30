# Overview

This is a React.js Redux D3 coding challenge

This has only been tested in Chrome

The following core technologies are used:

* React.js
* Redux
* React Router
* PostCSS with PreCSS plugin
* Webpack with many plugins
* D3 for visualizations

To view a live example of the release, go to the following URL: <http://cameronperry.com/examples/redux-d3-line-graph/>

Features:

- Transitions
- Responsive Layout

# Getting Started

Hopefully at this point you have Node / NPM installed.

1. Download the project, and run and install all local dependencies:

  ```
npm install
```

2. Once you install the dependencies you can go ahead and run the live reload coding environment. This will live reload any JS or CSS changes you make so you can quickly develop without refreshing the browser. Running this command does take a few seconds. You will be able to see the app at `http://localhost:8080/`

  ```
npm run dev
```

3. If you want to do a production release you can run the following command to get a full set of files outputted to the `release` directory.

  ```
npm run prod
```

  This command will export a HTML, JS, and CSS file to the `release` directory. You can then open that in your browser directly to confirm that it works.

4. There is also a command to clean up the release directory.

  ```
npm run clean
```

# If I had more time:

- Move the data out of the bundle file of the app and make them AJAX calls to either the JSON file or a server side API endpoint
- Optimize the data formatting logic for performance and move to a server side script such as a Node server
- Integrate PolyFill into the build process to make it more cross browser compatible while still using ES6
- Add date parsing due to the fact that the data may come out of order since order of the data may not always be guaranteed
- Add more interactivity to the graph, such as hover tooltips to show values at specific data points
- Add units tests against a simple data set so future changes could be made with confidence
- Add comments to support future work from other developers