import VisualizationInitialState from './VisualizationInitialState';

export default function(state = VisualizationInitialState, action) {
    switch (action.type) {
        case 'CHANGE_METRIC':
            return Object.assign({}, state, {metric: action.value});
        case 'CHANGE_QUARTER':
            return Object.assign({}, state, {quarter: action.value});
    }
    return state;
}
