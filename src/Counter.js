import React, { Component } from 'react';
import './App.css';

export default class Counter extends Component {

    render() {
        return (
            <div className="Counter">
                <h1>{this.props.count}</h1>
                <button onClick={this.props.increaseCount}>+</button>
                <button onClick={this.props.decreaseCount}>-</button>

                <button onClick={this.props.resetCount}>reset</button>

            </div>
        )
    }
}