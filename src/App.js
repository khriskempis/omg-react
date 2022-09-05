import { Component } from 'react';
import './App.css';

import Game from "./app/Game/Game.js";

// Components
import GameBoard from './components/GameBoard/game-board.components';
class App extends Component {
  constructor(){
    super();

    this.state = {
      hasGameStart: false,
      game: {},
      userName: '',
      player: {}

    }

    this.gameObj = {}
  }
  
  componentDidMount(){

  }

  onUserNameChange = (event) => {
    this.setState(()=> {
      return { userName: event.target.value}
    })
  }

  startGame = () => {
    if(!this.state.hasGameStart){
      let { gameObj } = this;
      gameObj = new Game([this.state.userName]);
      gameObj.gameStart();

      this.setState(() => {
        return { 
          game: gameObj.data,
          player: gameObj.players[0],
          hasGameStart: true
        }
      }, () => {
        console.log(this.state.game)
      })
    }
  }



  render() {
    const { hasGameStart, game, player } = this.state;
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
          <GameBoard 
            gameObj={game}
            player={player}
          />
        }
        
      </div>
    );
  }
}

export default App;
