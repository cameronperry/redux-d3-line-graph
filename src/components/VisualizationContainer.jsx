import './VisualizationContainer.css';
import React from 'react';
import {connect} from 'react-redux';
import * as VisualizationActions from '../reducers/VisualizationActions';
import Selector from './Selector';
import Visualization from './Visualization';
import Legend from './Legend';
import RawData from '../data/cars-by-day.json';
import d3 from 'd3';

const VisualizationContainer = React.createClass({
    componentWillMount() {
      this.colors = d3.scale.category20();
    },
    getVisualizationData() {
        const data = {};
        switch (this.props.metric) {
            case 'daily':
                RawData.forEach((d) => {
                   if (d['fiscal.quarter'] === this.props.quarter) {
                       if (!data[d['fiscal.year']]) {
                           data[d['fiscal.year']] = [];
                       }
                       data[d['fiscal.year']].push(d['car.count']);
                   }
                });
                break;
            case 'cumulative':
                RawData.forEach((d) => {
                    if (d['fiscal.quarter'] === this.props.quarter) {
                        let lastValue = 0;;
                        if (!data[d['fiscal.year']]) {
                            data[d['fiscal.year']] = [];
                        } else {
                            lastValue = data[d['fiscal.year']][data[d['fiscal.year']].length - 1]
                        }
                        data[d['fiscal.year']].push(Math.round((lastValue + d['car.count']) * 10) / 10);
                    }
                });
                break;
            case 'yoychange':
                const midData = {};
                RawData.forEach((d) => {
                    if (d['fiscal.quarter'] === this.props.quarter) {
                        let lastValue = 0;;
                        if (!midData[d['fiscal.year']]) {
                            midData[d['fiscal.year']] = [];
                            data[d['fiscal.year']] = [];
                        } else {
                            lastValue = midData[d['fiscal.year']][midData[d['fiscal.year']].length - 1]
                        }
                        midData[d['fiscal.year']].push(Math.round((lastValue + d['car.count']) * 10) / 10);
                    }
                });
                for (let year in midData) {
                    for (let i = 0; i < midData[year].length; i++) {
                        const prevYearValue = midData[year - 1] ? midData[year - 1][i] : undefined;
                        const yearValue = midData[year][i];
                        if (prevYearValue !== undefined) {
                            data[year].push(Math.round((yearValue - prevYearValue) * 10) / 10);
                        }
                    }
                }
                break;
        }
        const resultData = [];
        for (let year in data) {
            if (data[year].length) {
                resultData.push(
                    {
                        year: year,
                        values: data[year]
                    }
                )
            }
        }
        return resultData;
    },
    render: function() {
        return (
            <div className="Visualization-Container">
                <div className="Visualization-Container-Column">
                    <div className="Visualization-Container-Controls">
                        <Selector
                            options={[
                                {label: 'Daily Normalized Car Counts', value: 'daily'},
                                {label: 'Cumulative Car Counts', value: 'cumulative'},
                                {label: 'YoY Change in Car Counts', value: 'yoychange'},
                            ]}
                            selected={this.props.metric}
                            display='vertical'
                            onSelect={value => this.props.changeMetric(value)}
                        />
                        <Selector
                            options={[
                                {label: 'Q1', value: 1},
                                {label: 'Q2', value: 2},
                                {label: 'Q3', value: 3},
                                {label: 'Q4', value: 4},
                            ]}
                            selected={this.props.quarter}
                            display='horizontal'
                            onSelect={value => this.props.changeQuarter(value)}
                        />
                    </div>
                    <div className="Visualization-Container-Legend">
                        <Legend
                            data={this.getVisualizationData()}
                            colors={this.colors}
                        />
                    </div>
                </div>
                <div className="Visualization-Container-Diagram">
                    <Visualization
                        data={this.getVisualizationData()}
                        colors={this.colors}
                    />
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        data: state.Visualization.data,
        metric: state.Visualization.metric,
        quarter: state.Visualization.quarter,
        loaded: state.Visualization.loaded
    };
}

export default connect(
    mapStateToProps,
    VisualizationActions
)(VisualizationContainer);
