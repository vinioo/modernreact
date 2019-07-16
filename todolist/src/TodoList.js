import React, { Component } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

export default class TodoList extends Component {
    state = {
        tasks: []
    };
    newTask = newTask => {
        this.setState({ tasks: [...this.state.tasks, newTask] });
    };
    removeTask = taskId => {
        this.setState({
            tasks: this.state.tasks.filter(task => task.id !== taskId)
        })
    }
    updateTask = (taskId, updatedTask) => {
        const updatedTodos = this.state.tasks.map(task => {
            if(task.id === taskId) {
                return {...task, name: updatedTask}
            }
            return task;
        })
        this.setState({
            tasks: updatedTodos
        })
    }

    toggleCompletion = (taskId) => {
        const updatedTodos = this.state.tasks.map(task => {
            if(task.id === taskId) {
                return {...task, completed: !task.completed}
            }
            return task;
        })
        this.setState({
            tasks: updatedTodos
        })
    }
    render() {
        return (
            <div>
                {this.state.tasks.map(task => (
                    <Todo name={task.name} key={task.id} id={task.id} completed={task.completed} toggleTodo={this.toggleCompletion} removeTask={this.removeTask} updateTask={this.updateTask}></Todo>
                ))}
                <TodoForm newTask={this.newTask} />
            </div>
        );
    }
}
