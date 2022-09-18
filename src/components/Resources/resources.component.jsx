export const renderRequiredResource = (requiredResource) => {
  // TODO: add highest to lowest resource logic to display of resources
  // use sort function to sort resources from highest to lowest
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
                className="required-resource"
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

export const renderMarketOfficeResource = (resource) => {
  return (
    <>
      <p
        className="plus-one-resource"
      >
        +{resource}
      </p>
    </>
  )
}