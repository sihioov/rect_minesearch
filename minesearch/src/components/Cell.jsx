import { Component } from 'react';
import '../css/cell.css';
import mine from '../resources/mine.png';
// import asset from '../resources/';
import assetPath from '../AssetHelper'

class Cell extends Component {

    __img = ['default', 'normal', '1', '2', 'mine'];
    __className = ['default', 'normal', '1', '2', 'mine'];

    constructor(props) {
        super(props);

        this.state = {
            cell: this.props.cell,
            curImg: this.__img[0],
            mineNumber: 10,
        }
    }


    changeCell = (e) => {
        // e.preventDefault();
        // this.changeImgae(e);
        // this.changeFloor(e);
    }

    clickedCell = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            switch (e.button) {
                // left click
                case 0:
                    this.clickedLeftCell(e);
                    break;
                case 1:
                    console.log('Click middle btn');
                    break;
                // right click
                case 2:
                    console.log('Click right btn');
                    this.clickedRightCell(e);
                    
                    break;
                default:
                    console.log('Unknown btn');
                    break;
            }
        }
    }

    selectRelatedCell = (e) => {
        const cell = e.target.id;
        console.log('className : '+cell.className);
    }

    clickedLeftCell = (e) => {
        e.preventDefault();
        //if (this.state.mode === 'mine');

        

        // GameOver
        if (this.state.cell === 'mine') {
            // this.changeImage(e);
            console.log('mine');
            this.gameOver();
        } else {

        }
        
        this.changeImage(e);
    }

    clickedRightCell = (e) => {
        e.preventDefault();
        //if (this.state.mode === 'mine');
        
        this.changeImage(e);
    }

    downedBtnCell = (e) => {
        e.preventDefault();
        this.changeFloor(e);
    }

    upBtnCell = (e) => {
        e.preventDefault();
    }


    gameOver = (e) => {
        this.props.func('GameOver!');
    }

    


    changeFloor = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            //document.getElementById(e.target.id)); // 클래스 내임 변경
            switch (e.button) {
                case 0:
                    console.log('downed case 0');
                    document.getElementById(e.target.id).style.backgroundColor = 'lightblue';
                    break;
                case 1:
                    console.log('downed case 1');
                    break;
                case 2:
                    console.log('downed case 2');
                    break;
                default:
                    console.log('downed case 3');
                    break;
            }
        }
    }

    changeImage = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            switch (e.button) {
                // left click
                case 0:
                    console.log('Click left btn : ' + e.target.id);
                    this.setState({
                        curImg: this.__img[0],
                    })
                    break;
                case 1:
                    console.log('Click middle btn');
                    break;
                // right click
                case 2:
                    console.log('Click right btn');
                    this.setState({
                        curImg: this.__img[0],
                    })
                    break;
                default:
                    console.log('Unknown btn');
                    break;
            }
        } 
    }


    render() {
        //const elements = ['1', '2', '3', '4', '5'];
        // console.log(this.props.level);
        return (
            <>
                <div className='cell'/>
                {/* <button className='Cell' /> */}
                {/* <button className='Cell'/> */}
                {/* <div className='Cell'> </div> */}
                {/* <button className='Cell' onMouseDown={this.downedBtnPart} onClick={this.clickedPart} onMouseUp={this.upBtnPart} id={`mineDiv`+this.props.id} >
                </button> */}
            </>
        );
    }
}

export default Cell;

// create random array