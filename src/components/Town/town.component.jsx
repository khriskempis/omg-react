import { 
  renderRequiredResource, 
  renderMarketOfficeResource
} from '../Resources/resources.component'

import {
  EFFICIENT,
  INEFFICIENT,
  PLACE_WORKER
} from '../../constants'

import './town.styles.scss'

const Town = ({ player: { town }, phase, setWorker}) => {
  const handleSelectWorker = (event) => {
    console.log(event)
    const { innerText, parentElement: { dataset: { id } } } = event.target;
    return setWorker({
      workerStatus: innerText,
      id,
    });
  }

  return (
    <div className="town game__section">
      <h4>Town</h4>
      <div className="town__list-container container__overflow-scroll">
        <ul className="town__list">
          {
            town && 
            town.map(({ 
              id, 
              name, 
              requiredResource, 
              plusOneResource, 
              produce, 
              value 
            }) => {
            return (
              <li 
                key={id}
                className="town__building game__card" 
              >
                {
                  phase === PLACE_WORKER && 
                    <div className="town__select-worker" data-id={id} onClick={handleSelectWorker}>
                      <label>Place Worker</label>
                      <button>Efficient</button>
                      <button>Inefficient</button>
                    </div>
                }
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
    </div>
  )
}

export default Town;