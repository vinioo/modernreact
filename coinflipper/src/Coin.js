import React, { Component } from 'react'
import './Coin.css'

export default class Coin extends Component {
    render() {
        return (
            <div className="Coin">
                <img src={this.props.info.imgSrc} alt={this.props.info.side}/>
            </div>
        )
    }
}
