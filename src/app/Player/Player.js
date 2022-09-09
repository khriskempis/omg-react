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

class Player {
  constructor(name){
    this.userName = name;
    this.playerData = {};

    this.createPlayer();
  }

  createPlayer(){
    this.playerData = {
      id: this._createPlayerId(),
      username: this.userName,
      money: 0,
      vp: 0,
      hand: [],
      town: [],
      assistants: []
    }
  }

  _createPlayerId(){
    return Math.floor(Math.random() * Date.now())
  }

  addCardToHand(cards){
    let { hand } = this.playerData;
    let newHand = [
      ...cards, 
      ...hand
    ]

    this.playerData.hand = newHand;
  }

  addBuilding(building){
    let { town } = this.playerData;
    let newTown = [
      building,
      ...town
    ]

    this.playerData.town = newTown 
  }
}

module.exports = Player;