const Deck = require('../Deck');
const Player = require('../Player');
const cardData = require("../../util/card-data/data.json");

const { 
    TURN_START,
    DEAL_CARDS,
    MARKETPLACE_SUNRISE,
    PLACE_WORKER,
    MARKETPLACE_SUNSET,
    BUYING_PHASE, 
    BUILDING_PRODUCTION,
    EFFICIENT,
    INEFFICIENT
} = require('../../constants');

class Game {
    constructor(userNames){
        this.cardData = cardData;
        this.userNames = userNames;
        this.players = [];
        this.gameDeck = [];

        this.currentPhaseOfGame = TURN_START;
        this.nextPhaseOfGame = DEAL_CARDS;

        // MarketPlace 
        this.marketSunrise = [];
        this.marketSunset = [];
        this.totalGoods = [];

        this.productionBuildings = [];
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
            currentPhase: this.currentPhaseOfGame,
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

    advancePhase(){
        this.currentPhaseOfGame = this.nextPhaseOfGame;
    }

    checkPhase(){
       const { currentPhaseOfGame } = this;
        switch (currentPhaseOfGame) {
            case TURN_START:
                // restart game
                console.log('Turn start')
                // discard marketplace
                if(this.marketSunrise.length || this.marketSunset.length){
                    const discardedCards = [
                        ...this.marketSunrise,
                        ...this.marketSunset
                    ]
                    this.gameDeck.discard(discardedCards);
                }
                // set market to empty array
                this.marketSunset = [];
                this.marketSunrise = [];
                this.totalGoods = [];
                // submit old hand, deal new hand

                // reset production buildings
                this.productionBuildings = [];

                // reset workers on towns
                this.players.forEach(player => {
                    player.town.forEach(building => {
                        building.hasWorker = false;
                    })
                })
                this.nextPhaseOfGame = DEAL_CARDS;
                break;
            case DEAL_CARDS: 
                console.log('dealing 2 cards')
                // deal 2(3) cards
                this.players.forEach(player => {
                    player.addCardToHand(this.gameDeck.deal(2))
                })
                this.nextPhaseOfGame = MARKETPLACE_SUNRISE;
                break;
            case MARKETPLACE_SUNRISE:
                console.log('market place sunrise');
                this.addToMarketPlace(this.marketSunrise);
                this.nextPhaseOfGame = PLACE_WORKER;
                break;
            case PLACE_WORKER:
                console.log('place worker');
                this.nextPhaseOfGame = MARKETPLACE_SUNSET                
                break;
            case MARKETPLACE_SUNSET:
                console.log('marketplace sunsert')
                this.addToMarketPlace(this.marketSunset);
                this.nextPhaseOfGame = BUILDING_PRODUCTION;
                break;
            case BUILDING_PRODUCTION:
                console.log('building production');
                // calculate resources used and buildings that produced
                this.calculateBuildingProduction();
                // restart game
                this.nextPhaseOfGame = BUYING_PHASE;
                break;
            case BUYING_PHASE:
                console.log('buying phase');
                // purchase more buildings or assitants

                // restart game
                this.nextPhaseOfGame = TURN_START;
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
        this.totalGoods = this.getTotalMarketPlaceResources();
    }

    placeWorker(playerId, workerData){
        const { buildingId, workerStatus } = workerData;

        const currentPlayer = this.getCurrentPlayer(playerId)
        const building = currentPlayer.town.find(building => building.id == buildingId)

        // add building to list of buildings that are producing
        this.productionBuildings.push({
            playerId,
            building
        })
        building.addWorker(workerStatus)
    }

    turnInResources(playerId, cardIds){
        const discardedCards = [];
        const currentPlayer = this.getCurrentPlayer(playerId)
        const newPlayerHand = currentPlayer.hand.filter(card => {
            if(cardIds.includes(card.id)){
                discardedCards.push(card);
            } 
            return !cardIds.includes(card.id);
        })
        currentPlayer.hand = newPlayerHand
        // this.gameDeck.discard(discardedCards);
        return discardedCards;
    }

    calculateBuildingProduction(){
        // rethink this as this function is expensive
        // has too many loops within 
        // TODO: move this to client side logic
        this.players.forEach(player => {
            const currentPlayer = this.getCurrentPlayer(player.id);
            currentPlayer.town.forEach(building => {
                const { hasWorker, hasAssistant } = building;
                if(hasWorker || hasAssistant){
                    const { totalGoods } = this;
                    const { requiredResource, workerStatus } = building;
                    let resources = Object.entries(requiredResource)
                        .filter(([ resource, amount ]) => {
                            return amount !== null;
                        })

                    // check set if requiredResources is met
                    const hasResources = resources.map(([resource, amount]) => {
                        return (totalGoods[resource] && totalGoods[resource] >= amount) ?? false;
                    })
                    const [ hasResourceA, hasResourceB ] = hasResources;

                    if(hasWorker && workerStatus === EFFICIENT && hasResourceA && hasResourceB){
                        console.log('has Efficiently produced, deal 2 goods');
                    } else {
                        console.log('failed to produce')
                    }
                } else {
                    console.log('building doesnt have worker')
                }
            })
        })
    }

    // separate into helpers file 
    getCurrentPlayer(playerId){
        return this.players.find(player => player.id === playerId)
    }

    getTotalMarketPlaceResources() {
        const totalGoods = [...this.marketSunrise, ...this.marketSunset].reduce((allCards, card) => {
            let resource = card.resource.toLowerCase();
            // grab existing count or set to 0
            const resourceCount = allCards[resource] ?? 0;
            return {
                ...allCards,
                [resource]: resourceCount + 1
            }
        }, {})
        return totalGoods;
    }

    // track first player

    // track Player stats

    // track turns

    // trigger next phase (marketplace, resolve buildings)
}

export default Game;