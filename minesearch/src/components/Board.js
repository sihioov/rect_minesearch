import React, { Component, useRef } from 'react';
import Land from './Land';

class Board extends Component {
    constructor(props) {
        super(props);
        this.board = React.createRef();
        this.state = {

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
                <div className='asd'><Land /></div>
            </>
        );
    }
}

export default Board;