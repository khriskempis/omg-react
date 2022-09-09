import './game-board.styles.scss'
import '../MarketPlace/marketPlace.styles.scss'

import PlayerHand from '../PlayerHand/playerHand.component';
import Town from '../Town/town.component';
import MarketPlace from '../MarketPlace/marketPlace.components';

const GameBoard = ({gameObj, player}) => {

  const { game: { marketSunrise, marketSunset} } = gameObj;

  return (
    <div>
      <h3>MarketPlace</h3>
      <div className="marketplace__container">
        <MarketPlace marketArray={marketSunrise} className={'sunrise'}/>
        <MarketPlace marketArray={marketSunset} className={'sunset'}/>
      </div>

      <PlayerHand player={player.playerData} />
      <Town player={player.playerData} />
      
    </div>
  )
}

export default GameBoard;