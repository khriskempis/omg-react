import { useState } from 'react'
import './playerHand.styles.scss'
import { 
  renderRequiredResource, 
  renderMarketOfficeResource
} from '../Resources/resources.component'
import { BUYING_PHASE, TURN_START } from '../../constants'

const PlayerHand = ({ player: { hand }, phase, submitCards }) => {
  let [selectedCards, setCards] = useState([])

  // reset cards to default state

  const selectCard = (id) => {
    const idInt = parseInt(id);
    if(isNaN(idInt)) return;

    if(!selectedCards.includes(idInt)){
      setCards([
        idInt,
        ...selectedCards
      ])
      submitCards(selectedCards);
    } else {
      console.log('card already selected');
    }
  }

  const deselectCard = (id) => {
    const idInt = parseInt(id);
    if(isNaN(idInt)) return;

    if(selectedCards.includes(idInt)) {
      const indexOfId = selectedCards.indexOf(idInt);
      if(indexOfId !== -1){
        console.log(indexOfId);

        // need to test if this is actually setting the state when you deselect a card
        // may need to revisit this and get other functionality working
        setCards(initialState => {
          const newState = initialState.filter(function(ids) {
            return ids !== idInt
          })
          return newState;
        });
        submitCards(selectedCards);
      }
    }
  }

  return (
    <div className="player-hand game__section">
      <h4>Hand</h4>
      <div className="player-hand__list-container container__overflow-scroll">
        <ul className="player-hand__list">
          { hand && hand.map((handData, index) => 
            <PlayerCard 
              key={index}
              data={handData} 
              phase={phase} 
              selectedCards={selectedCards} 
              selectCard={selectCard} 
              deselectCard={deselectCard}
            /> ) 
          }
        </ul>
      </div>

    </div>
  )
}

const PlayerCard = ({ data, phase, selectCard, deselectCard }) => {
  const { id, name, resource, requiredResource, plusOneResource, produce, value } = data;

  const [hasSelected, setHasSelected] = useState(false)

  // reset selected cards;

  const handleSelectClick = (e) => {
    const cardId = e.target.dataset.cardId;
    setHasSelected(!hasSelected);
    selectCard(cardId)
  }

  const handleUnselectClick = (e) => {
    const cardId = e.target.dataset.cardId;
    setHasSelected(!hasSelected);
    deselectCard(cardId)
  }

  return (
    <li 
      key={id}
      className={`player-hand__card game__card ${phase === BUYING_PHASE && ' player-hand__card--select'}${hasSelected && ' player-selected-card'}`} 
    >
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
      {
        phase === BUYING_PHASE && !hasSelected && 
        <div className="player-hand__select-card-button">
          <button data-card-id={id} onClick={handleSelectClick}>Select</button>
        </div>
      }
      {
        phase === BUYING_PHASE && hasSelected && 
        <div className="player-hand__select-card-button">
          <button data-card-id={id} onClick={handleUnselectClick}>Unselect</button>
        </div>
      }
    </li>
    )
}

export default PlayerHand;