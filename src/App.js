import React, { Component } from 'react'
import './App.css'

import WaitingTable from './WaitingTable'
import Counter from './Counter'
import BenchTable from './BenchTable'
import Graveyard from './Graveyard'

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      fightersWaiting: 
                [{"name": "test1","speed": 5, "action": 17},
                {"name": "test2","speed":  7, "action": 10}],
      fightersBench: 
                [{"name": "test3","speed": 15, "action": 25},
                {"name": "test4","speed": 10, "action": 34}],
      count: 0,
      Graveyard: []
    }

    this.sortFigh = this.sortFigh.bind(this) 
    this.increaseCount = this.increaseCount.bind(this)
    this.decreaseCount = this.decreaseCount.bind(this)
    this.resetCount = this.resetCount.bind(this)
    this.bench = this.bench.bind(this)
    this.killWait = this.killWait.bind(this)
    this.killBench = this.killBench.bind(this)
    this.resurrect = this.resurrect.bind(this)
    this.moreSpeedWaiting = this.moreSpeedWaiting.bind(this)
  }


  //=======COUNT STUFF==========

  componentDidMount(){
    this.sortFigh()
    this.bench()
  }

  sortFigh() {
    let sortedFigh = this.state.fightersWaiting.sort((a,b) => a.action - b.action);
    this.setState({ fighters: sortedFigh })
  }

  increaseCount() {
    this.setState({count: this.state.count + 1})
    this.bench()
  }

  decreaseCount(){
    if (this.state.count > 0) {
    this.setState({count: this.state.count - 1})
    this.bench()
    }
  }

  resetCount() {
    this.setState({count: 0})
    this.bench()
  }

  //======================
  //        FIGHTERS
  //======================

  //========BENCHING/KILLING/RESURRECTING=======
  bench() {
    var newBench = [];
    var newWait = [];
    var tempFight = this.state.fightersWaiting.concat(this.state.fightersBench);

    tempFight.forEach(val => {
      if (val.action > this.state.count +1) {
        newWait.push(val)
      } else {newBench.push(val)}
    }) 
    this.setState({fightersBench: newBench, fightersWaiting: newWait})
  }

  killWait(t) {
      var tempDead = this.state.Graveyard;
      this.state.fightersWaiting.forEach((val,i,arr) => {
        if (val.name === t) {
          tempDead.push(val);
          this.setState({fightersWaiting: arr.splice(i,1), Graveyard: tempDead})
        }
      })
      this.bench()
  }

  killBench(t) {
    var tempDead = this.state.Graveyard;
    this.state.fightersBench.forEach((val,i,arr) => {
      if (val.name === t) {
        tempDead.push(val);
        this.setState({fightersBench: arr.splice(i,1), Graveyard: tempDead})
      }
    })
    this.bench()
}

resurrect(t) {
  this.state.Graveyard.forEach((val,i,arr) =>{
    if (val.name === t) {
      val.action = this.state.count;
      var hold = this.state.fightersBench.push(val);
      this.state.Graveyard.splice(i,1)
      this.setState({fightersBench: hold})
    }
  })
  this.bench()
}

//===========ACTION MANAGEMENT============

moreSpeedWaiting(f,s) {
  var tempAct = f.action
  this.setState.fightersWaiting({action: tempAct + s})
  console.log(f)
}

catchUpCount() {

}

//==================================================================================
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <Counter 
            count={this.state.count} 
            increaseCount={this.increaseCount} 
            decreaseCount={this.decreaseCount}
            resetCount={this.resetCount}/>
        <BenchTable  
            people={this.state.fightersBench}
            kill={this.killBench}/>
        <WaitingTable 
            people={this.state.fightersWaiting}
            kill={this.killWait}
            speed={this.moreSpeedWaiting}/>
        <Graveyard 
            people={this.state.Graveyard}
            resurrect={this.resurrect}/>

            <button onClick={this.sortFigh}>TEST</button>
      </div>
    );
  }
}

export default App;
