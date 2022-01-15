import { Component } from 'react';
import '../css/parts.css';
import mine from '../resources/mine.png';

class Parts extends Component {

    constructor() {
        super();
        this.state = {
            mode: '',
            surface: '',
            mineNumber: 10,
        }
    }

    clickedBtnParts = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            switch (e.button) {
                case 0:
                    console.log('Click left btn');
                case 1:
                    console.log('Click middle btn');
                case 2:
                    console.log('Click right btn');
                default:
                    console.log('Unknown btn');
            }
        } 

    }


    render() {

        const elements = ['1', '2', '3', '4', '5'];

        return (
            <>
                <div>
                    {elements.map((value, index) => {
                        return (
                            <div key={index} className='mine'>
                                <button className='' onMouseDown={this.clickedBtnParts} key={index}>
                                    <img alt="" src={mine}  className='mineImg'/>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </>
        );
    }
}

export default Parts;