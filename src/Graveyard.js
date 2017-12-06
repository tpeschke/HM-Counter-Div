import React, { Component } from 'react'
import './App.css'

export default class Graveyard extends Component {

    render() {
        var person = this.props.people.map(d => {
            return <div className='fighter'>
                <p key={d.name} className="input">{d.name}</p>
                <p key={d.kill} className="input"><button onClick={_ => this.props.resurrect(d.name)}>:)</button></p>
            </div>
        })

        return (
            <div className="Graveyard">
                <div className="waitingHead">
                    <p className="input"> Name</p>
                    <p className="input"> Resurrect</p>
                </div>
                {person}
            </div>
        )
    }
}