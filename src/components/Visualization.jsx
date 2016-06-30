import './Visualization.css';
import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import d3 from 'd3';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        data: React.PropTypes.array,
        colors: React.PropTypes.func,
        margin: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            margin: 50
        };
    },
    componentDidMount: function() {
        const {container, line, width, height, xAxis, yAxis, years} = this.getVariables(this.props.data);

        years.enter()
            .append("g")
            .attr("class", "Visualization-Year")
            .append("path")
            .attr("class", "Visualization-Line")
            .attr("d", d => line(d.values))
            .style("stroke", d => this.props.colors(d.year));
        
        this.updateAxis(container, width, height, xAxis, yAxis);

        window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    componentDidUpdate: function() {
        const {container, line, width, height, years, xAxis, yAxis} = this.getVariables(this.props.data);

        years.transition()
            .select(".Visualization-Line")
            .attr("d", d => line(d.values))
            .style("stroke", d => this.props.colors(d.year));

        years.enter()
            .append("g")
            .attr("class", "Visualization-Year")
            .append("path")
            .attr("class", "Visualization-Line")
            .attr("d", d => line(d.values))
            .style("stroke", d => this.props.colors(d.year));

        years.exit()
            .remove();

        this.updateAxis(container, width, height, xAxis, yAxis);

    },
    handleResize() {
        const {container, line, width, height, xAxis, yAxis, years} = this.getVariables(this.props.data);

        years.transition()
            .duration(0)
            .select(".Visualization-Line")
            .attr("d", d => line(d.values))
            .style("stroke", d => this.props.colors(d.year));

        this.updateAxis(container, width, height, xAxis, yAxis);
    },
    updateAxis(container, width, height, xAxis, yAxis) {
        container.select(".Visualization-Axis--x").remove();
        container.select(".Visualization-Axis--y").remove();

        container.append("g")
            .attr("class", "Visualization-Axis Visualization-Axis--x")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis)
            .append("text")
            .attr("x", width)
            .attr("y", 25)
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .text("Day of Quarter");

        container.append("g")
            .attr("class", "Visualization-Axis Visualization-Axis--y")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .text("Cars");
    },
    getVariables: function(data) {
        const svg = d3.select(this.refs.svg);
        const width = parseInt(svg.style("width"), 10) - this.props.margin * 2;
        const height = parseInt(svg.style("height"), 10) - this.props.margin * 2;
        const container = d3.select(this.refs.container);

        const maxX = d3.max(data, year => year.values.length);
        const minY = d3.min(data, year => d3.min(year.values, value => value));
        const maxY = d3.max(data, year => d3.max(year.values, value => value));

        const years = container.selectAll(".Visualization-Year").data(data, d => d.year);

        var x = d3.scale.linear()
            .domain([0, maxX])
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([minY, maxY])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        const line = d3.svg.line()
            .x((d, i) => x(i))
            .y((d) => y(d));

        return {
            container,
            line,
            width,
            height,
            xAxis,
            yAxis,
            years
        }
    },
    render: function() {
        return (
            <svg className="Visualization" ref="svg">
                <g ref="container" transform={`translate(${this.props.margin},${this.props.margin})`} />
            </svg>
        );
    }
});
