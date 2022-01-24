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
            curLevel: this.props.curLevel,
            mineCount: 0,
            mineCountCategory: [3,6,9],
            initPart: '',
            isGenerateMine: false,
        }

       
            
            
    }


    renderParts = (e) => {

    }

    generateMine = (e) => {

        if(this.state.isGenerateMine)
            return;        
        
        const arry = new Array(mineCount);
        var mineCount = this.state.mineCount;
        var leftMineCount = mineCount;
        console.log('Generate : '+mineCount);

        // Probability
        // Todo: Complete array gen
        var random = 0;
        var standNum = 0;
        var maxSize = 10; // state
        const MAX = 10;
        var i;
        for (i = 0; i < MAX; i++) {
            standNum = leftMineCount/maxSize;
            random = Math.random(99);
            console.log('Stand num : ' + standNum + '   '+ 'Random Num : ' + random);
            if (random <= standNum) {
                console.log('This is mine');
                arry.push(1);
                maxSize--;
                leftMineCount--;
            }
            else {
                console.log('This is default');
                arry.push(0);
                maxSize--;
            } 
        }


        
        
        // Todo: plantMine()

        //this.plantMine();
        // this.setState({
        //     isGenerateMine: true,
        // })
    }

    plantMine = (e) => {
        
    }

    componentDidMount = () => {

        console.log('Did mount')

        this.setState({
            mineCount: this.state.mineCountCategory[this.state.curLevel],
        })
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
        //console.log('render')
        //this.generateMine();
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
                                {/* <Part id={value} func={this.checkGameOver} onClick={this.generateMine}/> */}
                                <Part id={value} func={this.checkGameOver} onClick={this.generateMine}/>
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