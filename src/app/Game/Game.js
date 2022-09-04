const Deck = require('../Deck/Deck');
const Player = require('../Player/Player');
const cardData = require("../card-data/data.json");

class Game {
    constructor(userNames){
        this.cardData = cardData;
        this.userNames = userNames;
        this.players = [];
        this.phaseOfGame = 'turn start';
        this.gameDeck = [];

        this.#TURN_START = 'turn start';
        this.#DEAL_CARDS = 'deal cards';
        this.#MARKETPLACE_SUNRISE = 'marketplace sunrise';
    }

    // 'deal cards',
    // 'marketplace sunrise',
    // 'place worker',
    // 'marketplace sunset',
    // 'marketplace sunset',
    // 'buying phase',

    // Game Phase Constants 
    #TURN_START;
    #DEAL_CARDS;
    #MARKETPLACE_SUNRISE;
    #PLACE_WORKER;
    #MARKETPLACE_SUNSET;
    #BUYING_PHASE;

    gameStart(){
        this._initilizePlayers(this.userNames);
        this._initilizeDeck();
        this._assignStartingPlayerCards();
        this.checkPhase();

        // return game state
    }

    get data(){
        return {
            players: this.players, 
            gamedDeck: this.gameDeck,
        }
    }

    // create Deck with reference to ids
    _initilizeDeck(){
        console.log('init deck');
        const cards = this.cardData.map(card => card.id);
        console.log(cards);
        this.gameDeck = new Deck(cards);
    }

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
    }

    _assignStartingPlayerCards(){
        const startingCards = this.gameDeck.deal(4)

        let shuffledDeck = Deck._shuffle(startingCards);

        this.players.forEach(player => {
            player.addBuilding(shuffledDeck.pop())
        })

        // check number of players
        // deal starting card randomly
    }

    checkPhase(){
        // Turn start
        // Deal cards
        // Marketplace Sunrise
        // Place Worker
        // MarketPlace Sunset
        // Building Production
        // Buying Phase
        const { phaseOfGame } = this;
        // move to constants to be able to used in both check and switch
        const phases = [
            this.#TURN_START,
            'deal cards',
            'marketplace sunrise',
            'place worker',
            'marketplace sunset',
            'marketplace sunset',
            'buying phase',
        ]
        switch (phaseOfGame) {
            case this.#TURN_START:
                
                break;
            case 'deal cards': 

                break;
            case 'marketplace sunrise':

                break;
            case 'place worker':
                
                break;
            case 'marketplace sunset':

                break;
            case 'buying phase':
                
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