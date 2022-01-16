import React, { Component, useRef } from 'react';
import Land from './Land';

class Board extends Component {

    

    constructor(props) {

        const levels = ['easy', 'medium', 'hard'];

        super(props);
        this.board = React.createRef();
        this.state = {
            level: levels[0],
        };
    }
    
    componentDidMount = (e) => {
        var a = document.getElementsByClassName('zxc');
        
        document.oncontextmenu = (e) => {
            return false;
        }
    }

    rightClickRm = (e) => {
        console.log('test');
    }

    render() {
        return (
            <>
                <div className='asd' ><Land level={this.state.level}/></div>
            </>
        );
    }
}

export default Board;