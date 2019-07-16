import React, { Component } from 'react'
import './Todo.css'

export default class Todo extends Component {
    state = {
        isEditing: false,
        task: this.props.name
    }
    handleRemove = () => {
        this.props.removeTask(this.props.id)
    }
    handleEdit = () => {
        this.setState({
            isEditing: true
        })
    }
    handleSave = (e) => {
        e.preventDefault()
        this.props.updateTask(this.props.id, this.state.task)
        this.setState({
            isEditing: false
        })
    }
    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleToggle = () => {
        this.props.toggleTodo(this.props.iddsdssddsdssd)
    }

    render() {
        return (
            <div>
                <div style={{display: this.state.isEditing && 'none'}}>
                    <label onClick={this.handleToggle} className={this.props.completed && 'completed'}>{this.props.name}</label>
                    <button onClick={this.handleEdit}>Edit</button>
                    <button onClick={this.handleRemove}>X</button>
                </div>
                <div style={{display: this.state.isEditing === true ? 'inline' : 'none'}}>
                    <form>
                        <input type="text" value={this.state.task} name="task" onChange={this.handleInput}/>
                        <button onClick={this.handleSave}>Save</button>
                    </form>
                </div>
            </div>
        )
    }
}
