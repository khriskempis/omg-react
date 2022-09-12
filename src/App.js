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
      userName: 'Khris',
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

      this.setState(() => {
        return { 
          game: this.gameObj.data,
          // assign first player of array
          player: this.gameObj.players[0],
          hasGameStart: true,
          currentPhase: this.gameObj.currentPhase,
        }
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

  setWorker = (workerData) => {
    const { player: { id } } = this.state;

    this.gameObj.placeWorker(id, workerData)

    this.setState(() => {
      return { game: this.gameObj.data}
    })
  }

  render() {
    const { hasGameStart, game, player, userName } = this.state;
    const { 
      onUserNameChange, 
      startGame,
      handleDealCard,
      handleTriggerPhase,
      setWorker
    } = this;

    return (
      <div className="App">
        <h1>Oh My Goods!</h1>

        {
          !hasGameStart 
          ? 
          <form onSubmit={startGame}>
            <label>Add username
              <input 
                type="text" 
                placeholder="username"
                onChange={onUserNameChange}
                value={userName}
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
              game={game.game}
              player={player}
              phase={game.currentPhase}
              setWorker={setWorker}
            />
          </div>
        }
        
      </div>
    );
  }
}

export default App;
