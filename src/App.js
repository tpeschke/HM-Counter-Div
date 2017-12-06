import React, { Component } from 'react'
import './App.css'
import Modal from 'react-responsive-modal'

import WaitingTable from './WaitingTable'
import Counter from './Counter'
import BenchTable from './BenchTable'
import Graveyard from './Graveyard'

class App extends Component {
  constructor() {
    super()
    
    this.state = {
      fightersWaiting: 
                [{"name": "test1","speed": 5, "action": 17, top: false},
                {"name": "test2","speed":  7, "action": 10, top: false}],
      fightersBench: 
                [{"name": "test3","speed": 15, "action": 25, top: false},
                {"name": "test4","speed": 10, "action": 34, top: false}],
      count: 1,
      Graveyard: [],
      open: false,
      top: 0,
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
    this.moreSpeedBench = this.moreSpeedBench.bind(this)
    this.catchUpCount = this.catchUpCount.bind(this)
    this.topBench = this.topBench.bind(this)
    this.topWaiting = this.topWaiting.bind(this)
  }


  //=======COUNT STUFF==========

  componentDidMount(){
    this.bench()
  } 
  
  sortFigh() {
    let sortedFigh = this.state.fightersWaiting.sort((a,b) => a.action - b.action);
    this.setState({ fightersWaiting: sortedFigh })
  }

  increaseCount() {
    this.setState({count: this.state.count + 1})
    this.bench()
  }

  decreaseCount(){
    if (this.state.count > 0) {
    this.setState({count: this.state.count - 1})
    this.bench
    }
  }

  resetCount() {
    this.setState({count: 0})
    this.bench
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
      if (val.action > this.state.count+1) {
        newWait.push(val)
      } else {newBench.push(val)}
    }) 
    this.setState({fightersBench: newBench, fightersWaiting: newWait})
    
    setTimeout(_=> this.sortFigh(), 250)
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
      this.state.fightersBench.push(val);
      this.state.Graveyard.splice(i,1)
    }
  })
  this.bench()
}

//===========ACTION MANAGEMENT============

moreSpeedWaiting(f) {
    this.state.fightersWaiting.forEach((val,i,arr) => {
      if (val.name === f.name) {
        val.action = val.action + val.speed;
       }
    })
    this.bench();
}

moreSpeedBench(f) {
  this.state.fightersBench.forEach((val,i,arr) => {
    if (val.name === f.name) {
      val.action = val.action + val.speed;
     }
  })
  this.bench();
}

catchUpCount(f) {
  this.state.fightersBench.forEach((val,i,arr) => {
    if (val.name === f.name) {
      val.action = this.state.count;
     }
  })
  this.bench();
}

//==========ToP=================

// topBench(f) {
//   this.setState({open: true})

//   this.state.fightersBench.forEach((val,i,arr) => {
//     if (val.name === f.name) {
//       val.action = this.state.count;
//      }
//   })
//   this.bench();
// }

topWaiting(f) {
  this.setState({open: true})

  this.state.fightersWaiting.forEach((val,i,arr) => {
    if (val.name === f.name) {
      val.action = this.state.count + (this.state.top * 5);
     }
  })
  this.bench();
}

onCloseModal = _=> {
  this.setState({open: false})
}



//==================================================================================
  render() {

    const { open } = this.state;
    
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
            kill={this.killBench}
            speed={this.moreSpeedBench}
            catchUp={this.catchUpCount}/>
        <WaitingTable 
            people={this.state.fightersWaiting}
            kill={this.killWait}
            speed={this.moreSpeedWaiting}
            top={this.topWaiting}/>
        <Graveyard 
            people={this.state.Graveyard}
            resurrect={this.resurrect}/>

            <button onClick={this.sortFigh}>TEST</button>

            
      <Modal open={open} onClose={this.onCloseModal} little>
        <p>Enter How Much Combatant Failed By</p>
        <input />
      </Modal>
      
      </div>
    );
  }
}

export default App;
