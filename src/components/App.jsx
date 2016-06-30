import './App.css';
import React from 'react';

export default React.createClass({
    render: function() {
        return (
            <div className="Root">
                <header className="Header">React Visualization Coding Challenge</header>
                <div className="Body">{this.props.children}</div>
                <footer className="Footer">Developed by Cameron Perry</footer>
            </div>
        );
    }
});
