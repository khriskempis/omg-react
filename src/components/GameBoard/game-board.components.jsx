import './game-board.styles.scss'
import '../MarketPlace/marketPlace.styles.scss'

import PlayerHand from '../PlayerHand/playerHand.component';
import Town from '../Town/town.component';
import MarketPlace from '../MarketPlace/marketPlace.components';

const GameBoard = ({game, player, phase, setWorker}) => {

  const { marketSunrise, marketSunset } = game;

  return (
    <div>
      <div className="marketplace game__section">
        <h3>MarketPlace</h3>
          <MarketPlace marketArray={marketSunrise} className={'sunrise'}/>
          <MarketPlace marketArray={marketSunset} className={'sunset'}/>
      </div>

      <PlayerHand player={player} />
      <Town player={player} phase={phase} setWorker={setWorker}/>
      
    </div>
  )
}

export default GameBoard;