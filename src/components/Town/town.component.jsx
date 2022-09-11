import { 
  renderRequiredResource, 
  renderMarketOfficeResource
} from '../Resources/resources.component'

import './town.styles.scss'

const Town = ({ player: { town } }) => {

  return (
    <div className="town">
      <h4>Town</h4>
      <ul className="town__list">
        {
          town && 
          town.map(({ id, name, requiredResource, plusOneResource, produce, value }) => {
          return (
            <li className="town__building" key={id}>
              <h4>{name}</h4>
              <div className="town__resources">
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

export default Town;