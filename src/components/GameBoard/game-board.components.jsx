import './game-board.styles.scss'
import '../PlayerHand/playerHand.styles.scss'

import Town from '../Town/town.component';

const GameBoard = ({gameObj, player}) => {

  const { hand } = player;

  return (
    <div>
      <h2>Game start</h2>
      <h3>MarketPlace</h3>
      <div className="player-hand">
        <h4>Hand</h4>
        <ul className="player-hand__list">
          {
            hand && 
            hand.map(({ id, name, requiredResource, produce, value }) => {
            const { hay, clay, lumber, stone, wool } = requiredResource || [];
            return (
              <li className="player-hand__card" key={id}>
                <h4>{name}</h4>
                <div className="town__building--req-resource">
                  { hay && <p type="hay" anount={hay}>{hay} Hay</p> }
                  { clay && <p type="clay" anount={clay}>{clay} Clay</p> }
                  { lumber && <p type="lumber" anount={lumber}>{lumber} Lumber</p> }
                  { stone && <p type="stone" anount={stone}>{stone} Stone</p> }
                  { wool && <p type="wool" anount={wool}>{wool} Wool</p> }
                </div>
                <p>{produce}</p>
                <p>{value}</p>
              </li>
              )
            })
          }
        </ul>
      </div>
      <Town 
        player={player.playerData}
      />
    </div>
  )
}

export default GameBoard;