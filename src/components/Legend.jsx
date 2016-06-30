import './Legend.css';
import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        data: React.PropTypes.array,
        colors: React.PropTypes.func
    },
    getInitialState() {
        return {
            width: 0,
            height: 0
        };
    },
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    handleResize() {
        const svg = d3.select(this.refs.svg);
        this.setState({
            width: parseInt(svg.style("width"), 10),
            height: parseInt(svg.style("height"), 10)
        });
    },
    render: function() {
        const yScale = d3.scale.ordinal()
            .domain(this.props.data.map(d => d.year))
            .rangeRoundPoints([0, this.state.height], 1);
        return (
            <svg className="Legend" ref="svg">
                {this.props.data.map((d) => {
                    return (
                        <g transform={`translate(0,${yScale(d.year)})`} className="Legend-Item" key={d.year}>
                            <text
                                className="Legend-Item-Text"
                                x={this.state.width}
                            >{d.year}</text>
                            <line
                                className="Legend-Item-Line"
                                x1={0}
                                y1="0"
                                x2={this.state.width - 40}
                                y2="0"
                                style={{stroke: this.props.colors(d.year)}}
                            />
                        </g>
                    )
                })}
            </svg>
        );
    }
});
