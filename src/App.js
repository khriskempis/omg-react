import { Component } from 'react';
import './App.scss';

import Game from "./app/Game/";

// Components
import GameBoard from './components/GameBoard/game-board.components';
import MessageBoard from './components/MessageBoard';
import { PLACE_WORKER, TURN_START, SUBMIT_CARDS } from './constants';
class App extends Component {
  constructor(){
    super();

    this.state = {
      hasGameStart: false,
      game: {},
      userName: 'Khris',
      player: {},
      playerChoice: {},
      currentPhase: TURN_START
    }

    this.gameObj = {}
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

  handleNextTriggerPhase = () => {
    this.gameObj.advancePhase();
    this.gameObj.checkPhase();
    const { data, data: { currentPhase } } = this.gameObj;
    this.setState({ 
      game: data,
      currentPhase
    })
  }

  handleCommitAction = () => {
    const { playerChoice: { action, payload } }  = this.state

    if(action || payload){
      switch (action) {
        case PLACE_WORKER:
          this.setWorker(payload);
          break;

        case SUBMIT_CARDS:
          this.setCards(payload);
          break;
      
        default:
          break;
      }
    }
    this.handleNextTriggerPhase();

    this.setState({ playerChoice: {}})
  }

  prepWorker = (workerData) => {
    const { player: { id } } = this.state;
    let playerChoice = {
      action: PLACE_WORKER,
      payload: {
        id, 
        data: workerData,
      }
    }
    this.setState({ playerChoice })
  }

  setWorker = ({ id, data }) => {
    this.gameObj.placeWorker(id, data)

    this.setState({ game: this.gameObj.data })
  }

  prepCards = (cardData) => {
    const { player: { id } } = this.state;
    let playerChoice = {
      action: SUBMIT_CARDS,
      payload: {
        id,
        data: cardData
      }
    }
    this.setState({ playerChoice })
  }

  setCards = ({ id, data }) => {
    // this.gameObj.placeWorker(id, data)

    // this.setState({ game: this.gameObj.data })
    console.log(data);
  }

  // setup state to accept choices from player 
  // after selecting end turn, commit those choices to the game obj
  // update state

  render() {
    const { 
      hasGameStart, 
      game, 
      player, 
      userName,
      playerChoice, 
      currentPhase 
    } = this.state;
    const { 
      onUserNameChange, 
      startGame,
      handleDealCard,
      handleNextTriggerPhase,
      prepWorker,
      handleCommitAction,
      prepCards
    } = this;

    return (
      <div className="App">
        <h1>Oh My Goods!</h1>

        {
          !hasGameStart 
          ? 
          // separate into own function with state 
          // username 
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
              <button onClick={handleNextTriggerPhase}>Trigger Next Phase</button>
              <button onClick={handleCommitAction}>End Turn</button>
            </div>
            <MessageBoard 
              currentPhase={currentPhase}
              playerChoice={playerChoice}
              commitAction={handleCommitAction}
            />
            <GameBoard 
              game={game.game}
              player={player}
              phase={game.currentPhase}
              setWorker={prepWorker}
              submitCards={prepCards}
            />
          </div>
        }
        
      </div>
    );
  }
}

export default App;
