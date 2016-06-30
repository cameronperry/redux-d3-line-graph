import './Selector.css';
import React, {PropTypes} from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
    mixins: [PureRenderMixin],
    propTypes: {
        options: React.PropTypes.array,
        selected: React.PropTypes.any,
        onSelect: React.PropTypes.func,
        display: React.PropTypes.oneOf(['vertical', 'horizontal'])
    },
    getDefaultProps() {
        return {
            options: [],
            onSelect: () => {},
            display: 'vertical'
        };
    },
    render: function() {
        const selectorClassNames = classNames({
            'Selector': true,
            'Selector--vertical': this.props.display === 'vertical',
            'Selector--horizontal': this.props.display === 'horizontal'
        });
        return (
            <div className={selectorClassNames}>
                {this.props.options.map((option) => {
                    const optionClassNames = classNames({
                        'Selector-Option': true,
                        'Selector-Option--vertical': this.props.display === 'vertical',
                        'Selector-Option--horizontal': this.props.display === 'horizontal',
                        'Selector-Option--selected': this.props.selected === option.value
                    });
                    const optionOnClick = () => {
                        this.props.onSelect(option.value);
                    }
                    return (
                        <div className={optionClassNames} onClick={optionOnClick} key={option.value}>
                            {option.label}
                        </div>
                    );

                })}
            </div>
        );
    }
});
