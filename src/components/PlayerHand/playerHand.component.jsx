import './playerHand.styles.scss'

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

const renderRequiredResource = (requiredResource) => {
  // TODO: add highest to lowest resource logic to display of resources
  return (
    <>
      { 
        Object.entries(requiredResource)
          .filter(([ resource, amount ]) => {
            return amount !== null;
          })
          .map(([ resource, amount ], index) => {
              return(
                <p 
                  className="player-hand__required-resource"
                  key={index}
                  type={resource} 
                  anount={amount}
                >
                    {amount} {resource.charAt(0).toUpperCase() + resource.slice(1)}
                </p> 
              )
          })
      }
    </>
  )
}

const renderMarketOfficeResource = (resource) => {
  return (
    <>
      <p
        className="player-hand__plus-one-resource"
        plusOne={resource}
      >
        +{resource}
      </p>
    </>
  )
}

export default PlayerHand;