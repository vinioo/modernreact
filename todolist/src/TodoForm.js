import React, { Component } from 'react';
import uuid from 'uuid';

export default class TodoForm extends Component {
    state = {
        name: []
    }
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault()
        const newTodo = { ...this.state, id: uuid(), completed: false };
        this.props.newTask(newTodo)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleInput}
                        required
                    />
                    <button type="submit">New Todo</button>
                </form>
            </div>
        );
    }
}
