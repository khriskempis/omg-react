import './game-board.styles.scss'

import PlayerHand from '../PlayerHand/playerHand.component';
import Town from '../Town/town.component';

const GameBoard = ({gameObj, player}) => {

  const { hand } = player.playerData;

  return (
    <div>
      <h2>Game start</h2>
      <h3>MarketPlace</h3>
      <PlayerHand player={player.playerData}/>
      <Town 
        player={player.playerData}
      />
    </div>
  )
}

export default GameBoard;