import React, { Component } from 'react';
import './App.css';

export default class WaitingTable extends Component {

    render() {
        var person = this.props.people.map(d => {
            return  <div className='fighter'>
                        <p key={d.name} className="input">{d.name}</p>
                        <p key={d.speed} className="input">
                            <button onClick={_=>this.props.speed(d,d.speed)}>{d.speed}</button></p>
                        <p key={d.action} className="input">{d.action}</p>
                        <p key={d.kill} className="input">
                            <button onClick={_=>this.props.kill(d.name)}>X</button></p>
                    </div>})

        return (
            <div className="Waiting">
                <div className="waitingHead">
                    <p className="input"> Name</p>
                    <p className="input"> speed</p>
                    <p className="input"> Action</p>
                    <p className="input"> Kill</p>
                </div>
                    {person}       
            </div>
        )
    }
}