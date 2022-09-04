import { Component } from 'react';
import './App.css';
import Deck from "./components/deck.component"
import cardData from "./app/card-data/data.json";

import Game from "./app/Game/Game.js";
class App extends Component {
  constructor(){
    super();

    this.state = {
      gameStart: false,
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
    if(!this.state.gameStart){
      let { gameObj } = this;
      gameObj = new Game([this.state.user]);
      gameObj.gameStart();
      this.setState(() => {
        return { 
          game: gameObj.data,
          gameStart: true
        }
      }, () => {
        console.log(this.state.game)
      })
    }
  }



  render() {
    const { gameStart } = this.state;
    const { onUserNameChange, startGame } = this;

    return (
      <div className="App">
        <h1>OMG App</h1>

        {
          !gameStart 
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
          </div>
        }
        
      </div>
    );
  }
}

export default App;
