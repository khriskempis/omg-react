const Deck = require("./Deck/deck");

class Game {
    constructor(cardData){
        this.players = [];
        this.phaseOfGame = 'turn start';
        this.gameDeck = [];
        this.cardData = cardData;
    }

    gameStart(){
        this.initilizeDeck();
        this.initilizePlayers();
        this.assignStartingPlayerCards();
        this.checkPhase();
    }

    // create Deck with reference to ids
    initilizeDeck(){
        console.log('init deck');
        this.gameDeck = new Deck();
        // init deck
        // shuffle deck
        // assign to this.deck
    }

    initilizePlayers(){
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
            'turn start',
            'deal cards',
            'marketplace sunrise',
            'place worker',
            'marketplace sunset',
            'marketplace sunset',
            'buying phase',
        ]
        switch (phaseOfGame) {
            case 'turn start':
                
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