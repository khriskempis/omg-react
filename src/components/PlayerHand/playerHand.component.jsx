import './playerHand.styles.scss'
import { 
  renderRequiredResource, 
  renderMarketOfficeResource
} from '../Resources/resources.component'

const PlayerHand = ({ player: { hand } }) => {
  return (
    <div className="player-hand game__section">
      <h4>Hand</h4>
      <ul className="player-hand__list">
        {
          hand && 
          hand.map(({ 
            id, 
            name, 
            resource, 
            requiredResource, 
            plusOneResource, 
            produce, 
            value 
          }) => {
          return (
            <li className="player-hand__card game__card" key={id}>
              <h4>{name}</h4>
              <p>{resource}</p>
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