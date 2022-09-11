
// {
// 	“id” : card.id,
// 	“color” : “yellow”,
// 	“name” : “Shoemaker”,
  // “germanName” : “Schusterwerkstatt”,
  // “img” : “url”
  // “requiredResources” : [
  //     "requiredResource":{
  //         "hay" : 4,
  //         "clay" : 2,
  //         "lumber" : null,
  //         "stone" : null,
  //         "wool" : null
  //     },
  // “produce” : [
  //     { Good }
  // ],
  // “value” : 8,
  // “chain” : [
  //     { Good }
  // ]
// }

const { 
  EFFICIENT,
  INEFFICIENT
} = require('../constants');
class Building {
  constructor(
    {
      id, 
      color,
      name,
      germanName,
      img,
      requiredResource: { 
        hay, 
        clay, 
        lumber, 
        stone,
        totalGoods
      },
      produce, 
      value,
      plusOneResource,
      chain, 
    }
  ){

    this.id = id;
    this.color = color;
    this.name = name;
    this.germanName = germanName;
    this.img = img || null;
    this.requiredResource = {
      hay: hay || null,
      clay: clay || null,
      lumber: lumber || null,
      stone: stone || null,
      totalGoods: totalGoods || null
    };
    this.produce = produce;
    this.value = value;
    this.chain = chain;
    this.plusOneResource = plusOneResource || null;

    // added props
    this.totalGoods = 0;
    this.hasWorker = false
    this.hasAssistant = false
    this.workerState = EFFICIENT;

  }
}

module.exports = Building;