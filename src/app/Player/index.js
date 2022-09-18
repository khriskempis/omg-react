// “Players” : {
// 	“id” : “1”,
// 	“userName” : 'KhrisMan',
// 	“money” : 12,
// 	“vp” : 6, 
// 	“assistants” : [
//         { Assistant }
//     ],
// 	“hand” : [
//         { Card }
//     ],
// 	“town” : [
//         { Building }
//     ],
// 	“isFirstPlayer” : true,
// }

const Building = require('../Building');

class Player {
  constructor(name){
    this.userName = name;
    this.id = this._createPlayerId();
    this.money = 0;
    this.vp = 0;
    this.hand = [];
    this.town = [];
    this.assistants = [];
  }

  _createPlayerId(){
    return Math.floor(Math.random() * Date.now())
  }

  addCardToHand(cards){
    let { hand } = this;
    let newHand = [
      ...cards, 
      ...hand
    ]

    this.hand = newHand;
  }

  addBuilding(cardData){
    let { town } = this;

    this.town = [
      new Building(cardData),
      ...town
    ] 
  }
}

module.exports = Player;