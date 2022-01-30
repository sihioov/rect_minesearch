import { Component } from 'react';
import '../css/part.css';
import mine from '../resources/mine.png';
// import asset from '../resources/';
import assetPath from '../AssetHelper'

class Part extends Component {

    __img = ['default', 'normal', '1', '2', 'mine'];
    __className = ['default', 'normal', '1', '2', 'mine'];

    constructor(props) {
        super(props);

        this.state = {
            partMode: this.props.partMode,
            curImg: this.__img[0],
            mineNumber: 10,
        }
    }


    changePart = (e) => {
        // e.preventDefault();
        // this.changeImgae(e);
        // this.changeFloor(e);
    }

    clickedPart = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            switch (e.button) {
                // left click
                case 0:
                    this.clickedLeftPart(e);
                    break;
                case 1:
                    console.log('Click middle btn');
                    break;
                // right click
                case 2:
                    console.log('Click right btn');
                    this.clickedRightPart(e);
                    
                    break;
                default:
                    console.log('Unknown btn');
                    break;
            }
        }
    }

    clickedLeftPart = (e) => {
        e.preventDefault();
        //if (this.state.mode === 'mine');

        

        // GameOver
        if (this.state.partMode === 'mine') {
            // this.changeImage(e);
            console.log('mine');
            this.gameOver();
        } else {

        }
        
        this.changeImage(e);
    }

    clickedRightPart = (e) => {
        e.preventDefault();
        //if (this.state.mode === 'mine');
        
        this.changeImage(e);
    }

    downedBtnPart = (e) => {
        e.preventDefault();
        this.changeFloor(e);
    }

    upBtnPart = (e) => {
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
        console.log(this.props.level);
        return (
            <>
                {/* <button className='partsDiv' onMouseDown={this.downedBtnPart} onClick={this.clickedPart} onMouseUp={this.upBtnPart} id={`mineDiv`+this.props.id} > */}
                    {/* <img alt="" src={process.env.PUBLIC_URL + 'asset/'+ this.state.curImg +'.png'}  value={this.props.level} id={`mineImg`+this.props.id}/> */}
                    {/* <img alt="" value={this.props.level} id={`mineImg`+this.props.id} className='btnImg'/> */}
                {/* </button> */}
            </>
        );
    }
}

export default Part;

// create random array