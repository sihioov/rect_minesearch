import React, { Component, useRef } from 'react';
import Land from './Land';

class Board extends Component {

    

    constructor(props) {
        // Easy: 0, Medium: 1, Hard: 2
        const GameLevel = [0,1,2]
        super(props);
        this.board = React.createRef();
        this.state = {
            curLevel: GameLevel[0],
        };
    }

    // Todo: Level set form
    
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
                <div className='asd' ><Land curLevel={this.state.curLevel}/></div>
            </>
        );
    }
}

export default Board;