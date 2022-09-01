import { Component } from "react";

class Deck extends Component {
    constructor(){
        super();

        this.state = {
            deck: []
        }
    }

    drawFromDeck = () => { 
        console.log('drawing from deck');
    }

    render(){
        const { drawFromDeck } = this;
        return (
            <div>
                <h3>Deck</h3>
                <button
                    onClick={drawFromDeck}
                >
                    Draw
                </button>
            </div>
        )
    }
}

export default Deck;