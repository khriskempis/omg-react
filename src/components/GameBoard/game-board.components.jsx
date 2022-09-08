import './game-board.styles.scss'
import '../MarketPlace/marketPlace.styles.scss'

import PlayerHand from '../PlayerHand/playerHand.component';
import Town from '../Town/town.component';

const GameBoard = ({gameObj, player}) => {

  const { game: { marketSunrise, marketSunset} } = gameObj;

  return (
    <div>
      <h2>Game start</h2>
      <h3>MarketPlace</h3>
      <div className="marketplace__container">
        <ul className="marketplace__market marketplace__sunrise">
          {
            marketSunrise &&
            marketSunrise.map(card => {
              return (
                <li key={card.id} className="marketplace__resource" style={ {backgroundColor: `${card.color}`}}>
                  <p>{card.resource}</p>
                </li>
              )
            })
          }
        </ul>
        <ul className="marketplace__market marketplace__sunset">
          {
            marketSunset &&
            marketSunset.map(card => {
              return (
                <li key={card.id} className="marketplace__resource" style={ {backgroundColor: `${card.color}`}}>
                  <p>{card.resource}</p>
                </li>
              )
            })
          }
        </ul>
      </div>

      <PlayerHand player={player.playerData} />
      <Town player={player.playerData} />

      
    </div>
  )
}

export default GameBoard;