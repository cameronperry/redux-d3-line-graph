import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import VisualizationContainer from './components/VisualizationContainer';

export default (
    <Route component={App}>
        <Route path="/" component={VisualizationContainer} />
    </Route>
);
