import './playerHand.styles.scss'

const PlayerHand = ({ player: { hand } }) => {
 return (
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
 )
}

export default PlayerHand;