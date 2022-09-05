const Town = ({ player: { town } }) => {

  return (
    <div className="town">
    <p>Town</p>
    <ul className="town__list">
      { town &&
        town.map(({ id, name, requiredResource, produce, value }) => {
          const { hay, clay, lumber, stone, wool } = requiredResource || [];
          return (
            <li className="town__building" key={id}>
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

export default Town;