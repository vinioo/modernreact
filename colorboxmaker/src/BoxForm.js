import React, { Component } from 'react';

export default class BoxForm extends Component {
    state = {
        width: '',
        height: '',
        color: '',
        id: 0
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            id: this.state.id + 1
        });
        this.props.addBoxes(this.state);
        this.clearInput();
    };

    clearInput = () => {
        this.setState({
            width: '',
            height: '',
            color: ''
        });
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="number"
                        name="width"
                        placeholder="Box Width:"
                        value={this.state.width}
                        onChange={this.handleInput}
                    />
                    <input
                        type="number"
                        name="height"
                        placeholder="Box Height:"
                        value={this.state.height}
                        onChange={this.handleInput}
                    />
                    <input
                        type="text"
                        name="color"
                        placeholder="Box Color:"
                        value={this.state.color}
                        onChange={this.handleInput}
                    />
                    <button type="submit">Create a new Box!</button>
                </form>
            </div>
        );
    }
}
