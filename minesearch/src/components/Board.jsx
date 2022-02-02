import React, { Component, useState } from 'react';
import '../css/board.css'
import Land from './Land';

class Board extends Component {


    constructor(props) {
        // Easy: 0, Medium: 1, Hard: 2
        const GameLevel = [0,1,2];

        super(props);
        // this.board = React.createRef();
        this.state = {
            curGameLevel: 0,
            landVerticalLength: 100,
            rerender: 0,
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

    setLandVerticalLength = (data) => {
        if (data !== this.state.landVerticalLength) {
            console.log('Change vertical : '+data);
            this.setState({
                landVerticalLength: data,
            })
        } else {
            console.log('Not change vertical');
        }

        var wrapperSelect = document.getElementById('wrapperSelect');
        wrapperSelect.style.width = data;
    }

    gameOptionSet = (data) => {
        
        // } else {
        //     console.log('Not change vertical');
        // }
    }

    

    // onRecv = (data) => {
    //     if (data !== this.state.landVerticalLength) {
    //         console.log('Change vertical');
    //         this.setState({
    //             landVerticalLength: data,
    //         })
    //     }
    // }
    
    render() {
        console.log('Board rendering!');
        const styles = {
            fontSize: '10pt',
        }
        const styles2 = {
            fontSize: 9,
        }
        return (
            <>
                <Land curGameLevel={this.state.curGameLevel} setLandVerticalLength={this.setLandVerticalLength}/>
            </>
        );
    }
}

export default Board;