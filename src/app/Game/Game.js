const Deck = require('../Deck/Deck');
const Player = require('../Player/Player');
const cardData = require("../card-data/data.json");

const { 
    TURN_START,
    DEAL_CARDS,
    MARKETPLACE_SUNRISE,
    PLACE_WORKER,
    MARKETPLACE_SUNSET,
    BUYING_PHASE 
} = require('../constants');

class Game {
    constructor(userNames){
        this.cardData = cardData;
        this.userNames = userNames;
        this.players = [];
        this.phaseOfGame = 'turn start';
        this.gameDeck = [];
    }

    gameStart(){
        this._initilizeDeck();
        this._initilizePlayers(this.userNames);
        this.checkPhase();

        // return game state
    }

    get data(){
        return {
            players: this.players, 
            gamedDeck: this.gameDeck,
        }
    }

    // create Deck this cards passed in
    _initilizeDeck(){
        console.log('init deck');
        const cards = this.cardData;
        
        this.gameDeck = new Deck(cards);
    }

    // create players 
    _initilizePlayers(userNames){
        if (!Array.isArray(userNames)) {
            throw new Error(
                "Player Count is empty or is not an Array, pass in array of Players"
            );
        }

        const numPlayers = userNames.length;
        for(let i=0; i < numPlayers; i++){
            this.players.push(
                new Player(userNames[i])
            )
        }
        // assign starting cards
        this._assignStartingPlayerCards();
    }

    _assignStartingPlayerCards(){
        // top 4 cards from cardData are the starting cards. 
        const startingCards = this.gameDeck.deal(4)

        let shuffledDeck = Deck._shuffle(startingCards);

        // pass players starting building from shuffled deck
        this.players.forEach(player => {
            player.addBuilding(shuffledDeck.pop())
        })
    }

    checkPhase(){

        // separate into functions
        this.gameDeck = Object.assign(
            this.gameDeck,
            { deck: Deck._shuffle(this.gameDeck.deck)}
        )
        // separate to functions
        this.players.forEach(player => {
            player.addCardToHand(this.gameDeck.deal(2))
        })

       const { phaseOfGame } = this;
        switch (phaseOfGame) {
            case TURN_START:
                
                break;
            case DEAL_CARDS: 

                break;
            case MARKETPLACE_SUNRISE:

                break;
            case PLACE_WORKER:
                
                break;
            case MARKETPLACE_SUNSET:

                break;
            case BUYING_PHASE:
                
                break;
            default:

                break;
        }
        

    }

    // track first player

    // track Player stats

    // track turns

    // trigger next phase (marketplace, resolve buildings)
}

export default Game;