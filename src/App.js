import { Component } from 'react';
import './App.css';

import Game from "./app/Game/";

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

  startGame = (e) => {
    e.preventDefault();
    const { hasGameStart, userName } = this.state;
    if(!hasGameStart){
      
      this.gameObj = new Game([userName]);
      this.gameObj.gameStart();
      console.log(this.gameObj)

      this.setState(() => {
        return { 
          game: this.gameObj.data,
          // assign first player of array
          player: this.gameObj.players[0],
          hasGameStart: true
        }
      }, () => {

      })
    }
  }

  handleDealCard = () => {
    // fix charburner being dealt from deck
    const { userName } = this.state;
    const card = this.gameObj.gameDeck.deal(1);
    const currentPlayer = this.gameObj.players.find(player => player.userName === userName);
    currentPlayer.hand.push(card);

    this.setState(() => {
      return { game: this.gameObj.data}
    })
  }

  handleTriggerPhase = () => {
    this.gameObj.checkPhase();
    this.setState(() => {
      return { game: this.gameObj.data}
    })
  }

  render() {
    const { hasGameStart, game, player } = this.state;
    const { 
      onUserNameChange, 
      startGame,
      handleDealCard,
      handleTriggerPhase
    } = this;

    return (
      <div className="App">
        <h1>OMG App</h1>

        {
          !hasGameStart 
          ? 
          <form onSubmit={startGame}>
            <label>Add username
              <input 
                type="text" 
                placeholder="username"
                onChange={onUserNameChange}
              />
            </label>
            <button type="submit" >Start Game</button>
          </form>
          : 
          <div>
            <div className="trigger">
              <button onClick={handleDealCard}>Deal Card</button>
              <button onClick={handleTriggerPhase}>Trigger Next Phase</button>
              <button>End Turn</button>
            </div>
            <GameBoard 
              gameObj={game}
              player={player}
            />
          </div>
        }
        
      </div>
    );
  }
}

export default App;
