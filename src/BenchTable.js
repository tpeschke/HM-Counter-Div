import React, { Component } from 'react';


export default class BenchTable extends Component {

    render() {
        var person = this.props.people.map(d => {
            return  <div className='fighter'>
                        <p key={d.name} className="input">{d.name}</p>
                        <p key={d.speed} className="input">
                                    <button 
                                    onClick={_=>this.props.speed(d)}>{d.speed}</button>
                                    <button onClick={_=>this.props.catchUp(d)}>>></button></p>
                        <p key={d.action} className="input">{d.action}</p>
                        <p key={d.kill} className="input"><button onClick={_=>this.props.kill(d.name)}>X</button></p>
                    </div>})

        return (
            <div className="BenchTable">
                <div className="head">
                    <p className="input"> Name</p>
                    <p className="input"> Speed</p>
                    <p className="input"> Action</p>
                    <p className="input"> Kill</p>
                </div>
                    {person}       
            </div>
        )
    }
}