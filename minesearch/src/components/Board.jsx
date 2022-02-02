import React, { Component, useRef } from 'react';
import '../css/board.css'
import Land from './Land';

class Board extends Component {

    
   

    constructor(props) {
        // Easy: 0, Medium: 1, Hard: 2
        const GameLevel = [0,1,2]
        super(props);
        this.board = React.createRef();
        this.state = {
            curLevel: GameLevel[1],
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

    gameOptionSet = (e) => {
        console.log('djaskdasd');
    }

    render() {
        const styles = {
            fontSize: 1,
            color: 'blue'
        }
        const styles2 = {
            fontSize: 9,
        }
        return (
            <>
                <div className='asd' ><Land curLevel={this.state.curLevel}/></div>
                <div>
                    <select className='select-level' style={styles}>
                        asd
                        <option value="#" style={styles}>Select level</option>
                        <option value="#">Easy</option>
                        <option value="#">Normal</option>
                        <option value="#">Hard</option>
                    </select>
                    <button style={styles2}>asdasd</button>
                    {/* <button onClick={this.gameOptionSet}>Game start</button> */}
                </div>
                
            </>
        );
    }
}

export default Board;