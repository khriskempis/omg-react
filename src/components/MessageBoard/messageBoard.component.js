import { 
  BUILDING_PRODUCTION,
  BUYING_PHASE, 
  DEAL_CARDS, 
  MARKETPLACE_SUNRISE, 
  MARKETPLACE_SUNSET, 
  PLACE_WORKER, 
  TURN_START 
} from "../../constants";

const MessageBoard = ({ currentPhase, playerChoice, commitAction }) => {

  let statusMessage = '';

  switch (currentPhase) {
    case TURN_START:
      statusMessage = (
        <>
          <h4>Turn Start</h4>
          <p>resetting gameboard</p>
        </>
      )
      break;  
    
    case DEAL_CARDS:
      statusMessage = (
        <>
          <h4>Dealing 2 cards</h4>
        </>
      )
      break;
    
    case MARKETPLACE_SUNRISE:
      statusMessage = (
        <>
          <h4>Marketplace Sunrise</h4>
        </>
      )
      break;
    
    case PLACE_WORKER:
      statusMessage = (
        <>
          <h4>Place Worker</h4>
          {
            Object.keys(playerChoice).length !== 0 &&
            <button onClick={commitAction}>Confirm Worker Placement</button>
          }
        </>
      )
      break;
    
    case MARKETPLACE_SUNSET:
      statusMessage = (
        <>
          <h4>Marketplace Sunrise</h4>
        </>
      )
      break;

    case BUILDING_PRODUCTION:
      statusMessage = (
        <>
          <h4>Production Phase</h4>
        </>
      )
      break;
  
    case BUYING_PHASE:
      statusMessage = (
        <>
          <h4>Buying Phase</h4>
          {
            Object.keys(playerChoice).length !== 0 &&
            <button onClick={commitAction}>Confirm Submit Cards</button>
          }
        </>
      )
      break;

    default:
      break;
  }

  return (
    <div className="message-board">
      {statusMessage}
    </div>
  )
}

export default MessageBoard;