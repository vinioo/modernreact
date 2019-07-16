import React, { Component } from 'react';

export default class Box extends Component {

    handleClick = () => {
        this.props.removeBox(this.props.id);
    }

    render() {
        return (
            <div>
                <div
                    className="Box"
                    onClick={this.handleClick}
                    style={{
                        width: `${this.props.width}px`,
                        height: `${this.props.height}px`,
                        backgroundColor: this.props.color
                    }}
                />
            </div>
        );
    }
}
