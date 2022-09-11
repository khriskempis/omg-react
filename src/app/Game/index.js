const Deck = require('../Deck');
const Player = require('../Player');
const cardData = require("../../util/card-data/data.json");

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
        this.gameDeck = [];

        this.currentPhaseOfGame = TURN_START;

        // MarketPlace 
        this.marketSunrise = [];
        this.marketSunset = [];
    }

    gameStart(){
        this._initilizeDeck();
        this._initilizePlayers(this.userNames);
        // return game state
    }

    get data(){
        return {
            players: this.players, 
            gameDeck: this.gameDeck,
            game: this,
        }
    }

    // create Deck this cards passed in
    _initilizeDeck(){
        console.log('init deck');
        let cards = this.cardData;
        const startingCards = cards.splice(0, 4);
        
        this.gameDeck = new Deck(cards);
        this.gameDeck.startingCards = startingCards;
        this.gameDeck.deck = Deck.shuffle(this.gameDeck.deck);
    }

    // create players 
    _initilizePlayers(userNames){
        if (userNames && !Array.isArray(userNames)) {
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
        const startingCards = this.gameDeck.startingCards;

        let shuffledDeck = Deck.shuffle(startingCards);

        // pass players starting building from shuffled deck
        this.players.forEach(player => {
            player.addBuilding(shuffledDeck.pop())
        })
    }

    checkPhase(){

       const { currentPhaseOfGame } = this;
        switch (currentPhaseOfGame) {
            case TURN_START:
                console.log('Turn start')
                
                if(this.marketSunrise.length || this.marketSunset.length){
                    const discardedCards = [
                        ...this.marketSunrise,
                        ...this.marketSunset
                    ]
                    this.gameDeck.discard(discardedCards);
                }

                this.marketSunset = [];
                this.marketSunrise = [];
                // restart game
                // submit old hand, deal new hand
                this.currentPhaseOfGame = DEAL_CARDS;
                break;
            case DEAL_CARDS: 
                console.log('dealing 2 cards')
                // deal 2(3) cards
                this.players.forEach(player => {
                    player.addCardToHand(this.gameDeck.deal(2))
                })
                this.currentPhaseOfGame = MARKETPLACE_SUNRISE;
                break;
            case MARKETPLACE_SUNRISE:
                console.log('market place sunrise');
                this.addToMarketPlace(this.marketSunrise);
                this.currentPhaseOfGame = PLACE_WORKER;
                break;
            case PLACE_WORKER:
                console.log('place worker');
                this.currentPhaseOfGame = MARKETPLACE_SUNSET                
                break;
            case MARKETPLACE_SUNSET:
                console.log('marketplace sunsert')
                this.addToMarketPlace(this.marketSunset);
                this.currentPhaseOfGame = BUYING_PHASE;
                break;
            case BUYING_PHASE:
                console.log('buying phase');
                // calculate resources used and buildings that produced

                // restart game
                this.currentPhaseOfGame = TURN_START;
                break;
            default:

                break;
        }
    }

    addToMarketPlace(market){
        let suns = 0;
        while(suns < 2){
            let currentCard = this.gameDeck.deal(1);
            market.push(currentCard);
            if(currentCard.sun) suns++;
        }
    }

    // track first player

    // track Player stats

    // track turns

    // trigger next phase (marketplace, resolve buildings)
}

export default Game;