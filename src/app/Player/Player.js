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
      assistants: [],
      worker: {
        efficiently: true,
        iniefficiently: false,
      }
    }
  }

  _createPlayerId(){
    return Math.floor(Math.random() * Date.now())
  }

  addBuilding(building){
    this.playerData.town = [
      building,
      ...this.playerData.town
    ]
  }
}

module.exports = Player;