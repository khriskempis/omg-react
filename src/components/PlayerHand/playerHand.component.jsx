import './playerHand.styles.scss'
import { 
  renderRequiredResource, 
  renderMarketOfficeResource
} from '../Resources/resources.component'

const PlayerHand = ({ player: { hand } }) => {
  return (
    <div className="player-hand">
      <h4>Hand</h4>
      <ul className="player-hand__list">
        {
          hand && 
          hand.map(({ id, name, requiredResource, plusOneResource, produce, value }) => {
          return (
            <li className="player-hand__card" key={id}>
              <h4>{name}</h4>
              <div className="player-hand__resources">
                {
                  requiredResource && 
                  renderRequiredResource(requiredResource)
                }
                {
                  plusOneResource &&
                  renderMarketOfficeResource(plusOneResource)
                }
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