import { Component } from 'react';
import './App.css';
import Deck from "./components/deck.component"
import cardData from "./app/card-data/data.json";

import Game from "./app/Game/Game.js";
class App extends Component {
  constructor(){
    super();

    this.state = {
      hasGameStart: false,
      game: {},
      user: '',

    }

    this.gameObj = {}
  }
  
  componentDidMount(){

  }

  onUserNameChange = (event) => {
    this.setState(()=> {
      return { user: event.target.value}
    })
  }

  startGame = () => {
    if(!this.state.hasGameStart){
      let { gameObj } = this;
      gameObj = new Game([this.state.user]);
      gameObj.gameStart();

      this.setState(() => {
        return { 
          game: gameObj.data,
          hasGameStart: true
        }
      }, () => {
        console.log(this.state.game)
      })
    }
  }



  render() {
    const { hasGameStart } = this.state;
    const { onUserNameChange, startGame } = this;

    return (
      <div className="App">
        <h1>OMG App</h1>

        {
          !hasGameStart 
          ? 
          <div>
            <input 
              type="text" 
              placeholder="username"
              onChange={onUserNameChange}
            />
            <button onClick={startGame}>add user</button>
          </div>
          : 
          <div>
            <h2>Game start</h2>
            <h3>MarketPlace</h3>
            <div>
              <p>hand</p>
            </div>
            <div>
              <p>buildings</p>
            </div>
          </div>
        }
        
      </div>
    );
  }
}

export default App;
