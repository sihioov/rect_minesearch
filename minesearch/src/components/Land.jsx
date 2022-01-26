import { Component } from 'react';
import Part from './Part';
import '../css/land.css'
class Land extends Component {
    
    static a = ['asd', 'zxc'];

    // Todo: partsId set
    constructor(props) {
        super(props);

        // Add modeCategory state
        this.state = {
            count: '20',
            partsId: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], // Todo: Auto set parts by level
            curLevel: this.props.curLevel,
            mineCount: 0,
            mineCountCategory: [10,40,99],
            initPart: '',
            isGenerateMine: false,
            landSize: '',
            landSizeCategory: [9*9, 16*16, 16*30],
            partsModeArry: [],
        }
            
            
    }


    renderParts = (e) => {

    }

    generateMine = (e) => {

        if(this.state.isGenerateMine)
            return;        
        
        const landSize = this.state.landSize;
        const mineCount = this.state.mineCount;

        const parts = new Array(landSize);
        var leftMineCount = mineCount;
        var leftParts = landSize;
        console.log('Generate : '+landSize);
        const test = ['asd', 'zxc', 'qwe']
        // Probability
        // Todo: Complete array gen
        var random = 0;
        var standNum = 0;
        var maxSize = 10; // state
        var count = 0;

        for (var i = 0; i < landSize; i++) {
            standNum = leftMineCount/leftParts;
            random = Math.random(99);
            console.log('Stand num : ' + standNum + '  '+ 'Random Num : ' + random);
            if (random <= standNum) {
                console.log('This is mine');
                parts[i] = 1;
                leftParts--;
                leftMineCount--;
            } else {
                console.log('This is default');
                parts[i] = 0;
                // parts.push('0');
                leftParts--;
            } 
        }
        console.log(parts);
        // for (var i = 0; i<landSize; i++)
        //     console.log('parts : '+parts[i]);

        // this.setState({
        //     //isGenerateMine: true,
        // })

        
        
        // Todo: plantMine()

        // this.plantMine();
        
        // this.setState((prevState) => ({
        //     //partsModeArry: [...prevState.partsModeArry, parts],
        //     partsModeArry: test,
        //     isGenerateMine: true,
        // }));

        this.setState({
            partsModeArry: parts,
            isGenerateMine: true,
        })
    }

    plantMine = (e) => {
    }

    componentDidMount = () => {
        this.setState({
            mineCount: this.state.mineCountCategory[this.state.curLevel],
            landSize: this.state.landSizeCategory[this.state.curLevel],
        })
    }


    checkGameOver = (e) => {
        console.log(e);
    }
    render() {
        console.log('this : '+this.state.partsModeArry)
        // Random mine-laying by level
        //this.randomMineLaying(this.state.level);
            
        const elements = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        console.log(this.state.level + 'test');
        // this.state.elements1.forEach((item, index, array) => {
        //     console.log(item)
        // })
        //console.log('render')
        //this.generateMine();
        // this.state.partsId.map((value, index) => {
        //     //console.log(value)
        // })

        // elements.push('7');
        // {elements.forEach((item, index, array) => {
        //     console.log(item)
        // })}
        return (
            <>
                <div className='land' id='land' >
                    {this.state.partsId.map((value, index) => {
                        return (
                            <div key={index} className='part' id={index-1} onClick={this.generateMine}>
                                <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index-1]}/>
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