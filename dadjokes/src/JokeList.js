import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokeList.css';

export default class JokeList extends Component {
    constructor(props) {
        super(props);
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    }
    static defaultProps = {
        numJokesToGet: 10
    };

    state = {
        jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
        loading: false
    };

    componentDidMount() {
        if (!this.state.jokes.length === 0) {
            this.getJokes();
        }
    }

    getJokes = async () => {
        try {
            let jokes = [];
            while (jokes.length < this.props.numJokesToGet) {
                let res = await axios.get('https://icanhazdadjoke.com/', {
                    headers: { Accept: 'application/json' }
                });
                let newJoke = res.data.joke;
                if (!this.seenJokes.has(newJoke)) {
                    jokes.push({ id: uuid(), text: newJoke, votes: 0 });
                } else {
                }
            }
            this.setState(
                st => ({
                    loading: false,
                    jokes: [...st.jokes, ...jokes]
                }),
                () =>
                    window.localStorage.setItem(
                        'jokes',
                        JSON.stringify(this.state.jokes)
                    )
            );
            window.localStorage.setItem('jokes', JSON.stringify(jokes));
        } catch (err) {
            alert(err);
            this.setState({loading: false})
        }
    };
    handleVote = (id, delta) => {
        this.setState(
            st => ({
                jokes: st.jokes.map(j =>
                    j.id === id ? { ...j, votes: j.votes + delta } : j
                )
            }),
            () =>
                window.localStorage.setItem(
                    'jokes',
                    JSON.stringify(this.state.jokes)
                )
        );
    };

    handleClick = () => {
        this.setState({ loading: true }, this.getJokes);
    };
    render() {
        if (this.state.loading) {
            return (
                <div className="JokeList-spinner">
                    <i className="far fa-8x fa-laugh fa-spin" />
                    <h1 className="JokeList-title">Loading</h1>
                </div>
            );
        }
        let jokes = this.state.jokes.sort((a,b) => b.votes - a.votes) 
        return (
            <div className="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className="JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src="" alt="" srcset="" />
                    <button
                        className="JokeList-getmore"
                        onClick={this.handleClick}>
                        New Jokes
                    </button>
                </div>
                <div className="JokeList-jokes">
                    {jokes.map(joke => (
                        <div>
                            <Joke
                                upvote={() => this.handleVote(joke.id, 1)}
                                downvote={() => this.handleVote(joke.id, -1)}
                                key={joke.id}
                                votes={joke.votes}
                                text={joke.text}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
