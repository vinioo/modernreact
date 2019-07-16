import React, { Component } from 'react'

import BoxForm from './BoxForm';
import Box from './Box'

export default class BoxList extends Component {
    
    state = {
        boxes: [{}],
    }
    
    addBoxes = (newBox) => {
        this.setState(boxes => ({
            boxes: [...this.state.boxes, newBox]
        }))
    }

    removeBox = (box) => {
        this.setState({
            boxes: this.state.boxes.filter(item => item.id !== box)
        })
    }
    render() {
        return (
            <div>
                <BoxForm addBoxes={this.addBoxes} />
                {this.state.boxes.map(box => (
                     <Box width={box.width} height={box.height} color={box.color} key={box.id} id={box.id} removeBox={this.removeBox}/>
                )
                )}

            </div>
        )
    }
}
