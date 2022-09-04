import { Component } from "react";

class Deck extends Component {

    drawFromDeck = () => { 
        console.log('drawing from deck');
        this.props.onClickHandler();
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