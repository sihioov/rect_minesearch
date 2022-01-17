import { Component } from 'react';
import '../css/part.css';
import mine from '../resources/mine.png';
// import asset from '../resources/';
import assetPath from '../AssetHelper'

class Part extends Component {
    
    __img = ['default', '1', '2', 'mine'];

    constructor(props) {
        super(props);

        this.state = {
            mode: '',
            curImg: this.__img[0],
            mineNumber: 10,
        }
    }

    

    clickedBtnParts = (e) => {
        e.preventDefault();
        this.chagneImgae(e);
    }

    chagneImgae = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            switch (e.button) {
                // left click
                case 0:
                    console.log('Click left btn : '+e.target.id);
                    break;
                case 1:
                    console.log('Click middle btn');
                    break;
                // right click
                case 2:
                    console.log('Click right btn');
                    this.setState({
                        curImg: this.__img[3],
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
                <button className='partsBtn' onMouseDown={this.clickedBtnParts}>
                    <img alt="" src={process.env.PUBLIC_URL + 'asset/'+ this.state.curImg +'.png'}  className='partsImg' value={this.props.level} id={`mineImg`+this.props.id}/>
                </button>
            </>
        );
    }
}

export default Part;

// create random array