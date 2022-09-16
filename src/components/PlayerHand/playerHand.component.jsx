import { useState, useEffect } from 'react'
import './playerHand.styles.scss'
import { 
  renderRequiredResource, 
  renderMarketOfficeResource
} from '../Resources/resources.component'
import { BUYING_PHASE, TURN_START } from '../../constants'

const SELECT = 'select',
      UNSELECT = 'unselect';

const PlayerHand = ({ player: { hand }, phase, submitCards }) => {
  let [selectedCards, setCards] = useState([])

  // reset cards to default state

  const handleSelectCard = (type, cardId) => {
    switch (type) {
      case SELECT:
        selectCard(cardId);
        break;
      case UNSELECT:
        deselectCard(cardId);
        break;
    
      default:
        break;
    }
  }

  const selectCard = (id) => {
    const idInt = parseInt(id);
    if(isNaN(idInt)) return;

    if(!selectedCards.includes(idInt)){
      submitCards([idInt, ...selectedCards]);
      setCards([
        idInt,
        ...selectedCards
      ])
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
        const newState = selectedCards.filter(function(ids) {
          return ids !== idInt
        })
        submitCards(newState);
        setCards(newState);
      }
    }
  }

  return (
    <div className="player-hand game__section">
      <h4>Hand</h4>
      <div className="player-hand__list-container container__overflow-scroll">
        <ul className="player-hand__list">
          { hand && hand.map((handData) => 
            <PlayerCard 
              key={handData.id}
              data={handData} 
              phase={phase} 
              selectedCards={selectedCards} 
              handleSelectCard={handleSelectCard}
            /> ) 
          }
        </ul>
      </div>

    </div>
  )
}

const PlayerCard = ({ data, phase, handleSelectCard }) => {
  const { id, name, resource, requiredResource, plusOneResource, produce, value } = data;

  const [hasSelected, setHasSelected] = useState(false)
  // reset selected cards;

  const handleButtonClick = (e) => {
    const cardId = e.target.dataset.cardId;
    const selectType = e.target.dataset.selectType;

    switch (selectType) {
      case SELECT:
        setHasSelected(!hasSelected);
        handleSelectCard(SELECT, cardId)
        break;
      
      case UNSELECT:
        setHasSelected(!hasSelected);
        handleSelectCard(UNSELECT, cardId)
        break;
    
      default:
        break;
    }
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
          <button data-card-id={id} data-select-type={SELECT} onClick={handleButtonClick}>Select</button>
        </div>
      }
      {
        phase === BUYING_PHASE && hasSelected && 
        <div className="player-hand__select-card-button">
          <button data-card-id={id} data-select-type={UNSELECT} onClick={handleButtonClick}>Unselect</button>
        </div>
      }
    </li>
    )
}

export default PlayerHand;