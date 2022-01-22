import { Component } from 'react';
import Part from './Part';
import '../css/land.css'
class Land extends Component {
    
    static a = ['asd', 'zxc'];

    constructor(props) {
        super(props);

        this.state = {
            count: '20',
            elements1: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            level: this.props.level,
            mineCount: 0,
            mineCountCategory: [3,10,30],
            initPart: '',
        }    
    }


    renderParts = (e) => {

    }

    generateMine = (e) => {
        switch (this.state.level) {
            case 'easy':
                this.setState({
                    mineCount: 3,
                })
                break;
            case 'medium':
                this.setState({
                    mineCount: 10,
                })
                break;
            case 'hard':
                this.setState({
                    mineCount: 30,
                })
                break;
            default:
                break;
        }
        

        // Todo: make combination alg
        const mineCount = this.state.mineCount;
        const arry = new Array(mineCount);
        const leftCount = mineCount;


        this.drawMine();
    }

    drawMine = (e) => {
        
    }

    componentDidMount = () => {
        //console.log('didmound')
    }


    checkGameOver = (e) => {
        console.log(e);
    }
    render() {

        // Random mine-laying by level
        //this.randomMineLaying(this.state.level);
            
        const elements = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        console.log(this.state.level + 'test');
        // this.state.elements1.forEach((item, index, array) => {
        //     console.log(item)
        // })
        console.log('render')
        this.state.elements1.map((value, index) => {
            //console.log(value)
        })

        // elements.push('7');
        // {elements.forEach((item, index, array) => {
        //     console.log(item)
        // })}
        return (
            <>
                <div className='land' id='land' >
                    {this.state.elements1.map((value, index) => {
                        return (
                            <div key={index} className='part' id={index} onClick={this.generateMine}>
                                <Part id={value} func={this.checkGameOver}/>
                            </div>
                        )
                    })}
                </div>
            </>
        )
        // return (
        // <>
            
        // </ >
        // );
    }
}

export default Land;