import React, { Component } from 'react';
import axios from 'axios';
import './Deck.css'

import Card from './Card';

const API_BASE_URL = `https://deckofcardsapi.com/api/deck`;

export default class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            drawn: []
        };
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({ deck: deck.data });
    }
    async getCard() {
        let cardUrl = `${API_BASE_URL}/${this.state.deck.deck_id}/draw/`;
        try {
            let cardResponse = await axios.get(cardUrl);
            if (!cardResponse.data.success) {
                throw new Error('No card Remaining');
            }
            let card = cardResponse.data.cards[0];
            this.setState(oldSt => ({
                drawn: [
                    ...oldSt.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }
                ]
            }));
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const cards = this.state.drawn.map(c => (
            <Card name={c.name} image={c.image} key={c.id} />
        ));
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.getCard}>Get Card!</button>
                <div className="Card-deck">{cards}</div>
            </div>
        );
    }
}
