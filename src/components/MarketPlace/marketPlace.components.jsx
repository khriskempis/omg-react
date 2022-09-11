const MarketPlace = ({ marketArray, className }) => {
  return (
    <div>
      <ul className={`marketplace__market marketplace__${className}`}>
          {
            marketArray &&
            marketArray.map(card => {
              return (
                <li key={card.id} className="marketplace__resource game__resource" style={ {backgroundColor: `${card.color}`}}>
                  <p>{card.resource}</p>
                </li>
              )
            })
          }
        </ul>
    </div>
  );
}

export default MarketPlace;