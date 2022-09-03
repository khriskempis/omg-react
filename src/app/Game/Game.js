const Deck = require('../Deck/Deck');

class Game {

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


    constructor(cardData){
        this.players = [];
        this.phaseOfGame = 'turn start';
        this.gameDeck = [];
        this.cardData = cardData;

        this.#TURN_START = 'turn start';
        this.#DEAL_CARDS = 'deal cards';
        this.#MARKETPLACE_SUNRISE = 'marketplace sunrise';
    }

    gameStart(){
        this._initilizeDeck();
        this._initilizePlayers();
        this.assignStartingPlayerCards();
        this.checkPhase();
    }

    // create Deck with reference to ids
    _initilizeDeck(){
        console.log('init deck');
        this.gameDeck = new Deck(this.cardData);
        // init deck
        // shuffle deck
        // assign to this.deck
    }

    _initilizePlayers(numPlayers){
        // console.log('init players');
        // create players
    }

    assignStartingPlayerCards(){
        const startingCards = [];
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

module.exports = Game;