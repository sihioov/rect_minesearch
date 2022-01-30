import { Component } from 'react';
import Part from './Part';
import '../css/land.css'


// Todo: Part align
class Land extends Component {
    
    static a = ['asd', 'zxc'];

    constructor(props) {
        super(props);

        // Add modeCategory state
        this.state = {
            count: '20',
            partsId: [], // Todo: Auto set parts by level
            curLevel: this.props.curLevel,
            mineCount: 0,
            mineCountCategory: [10,40,99],
            initPart: '',
            isGenerateMine: false,
            landSize: '',
            landSizeCategory: [9*9, 16*16, 16*30],
            lineLengthCategory: [9, 16, 16],
            lineLength:'',
            horizontalCategory: [9, 16, 30],
            horizontalLength:'',
            verticalCategory:[9, 16, 16],
            verticalLength: '',
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
            console.log(`index: ${i+1}, left part: ${leftParts}, left mine: ${leftMineCount}`)
            // console.log('index : '+(i+1)+','+`left part ${random}`);

            // console.log('left Part : '+leftParts);
            // console.log('left mine '+leftMineCount);
            console.log('Mine Probability : ' + (standNum*100).toFixed(1) +'%');
            console.log('');

            // 
            if (standNum == 0) {
                parts.fill(0, i);
                break;
            }

            if (random <= standNum) {   // Mine
                parts[i] = 1;
                leftParts--;
                leftMineCount--;
            } else {                    // Not mine
                parts[i] = 0;
                // parts.push('0');
                leftParts--;
            } 
        }
        console.log(parts);


        this.setState({
            partsModeArry: parts,
            isGenerateMine: true,
        })
    }

    plantMine = (e) => {

    }

    componentDidMount = () => {

        // Game setting        
        this.setState({
            mineCount: this.state.mineCountCategory[this.state.curLevel],
            landSize: this.state.landSizeCategory[this.state.curLevel],
            lineLength: this.state.lineLengthCategory[this.state.curLevel],
            partsId: [...Array(this.state.landSizeCategory[this.state.curLevel]).keys()],
            //partsId: [...Array(this.state.landSizeCategory[this.state.curLevel]).keys()],
            //partsId: this.state.partsId.from(Array(this.state.landSize.keys()))
            //partsId: this.state.partsId
        })
        console.log('this landsize : '+this.state.landSize);
        //tempArray.from(Array(this.state.landSize).keys())
        
        
    }

    

    checkGameOver = (e) => {
        console.log(e);
    }
    render() {
        
        const lineLength = this.state.lineLength;
        const landSize = this.state.landSize;

        return (
            <>
                <div className='land' id='land' >
                    {this.state.partsId.map((value, index) => {
                        if (index == 0) {
                            // console.log('index : '+(landSize - lineLength));
                            return (
                                <div key={index} className='firstPart' id={index} onClick={this.generateMine}>
                                    <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                                </div>
                            )
                        } else if (index == (landSize -1)) {
                        return (
                            <div key={index} className='lastPart' id={index} onClick={this.generateMine}>
                                <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                            </div> 
                            )
                        } else if (index == lineLength -1) {
                            return (
                                <div key={index} className='firstLeftPart' id={index} onClick={this.generateMine}>
                                    <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                                </div>
                            )
                        } else if (index == (landSize - lineLength)) {
                        return (
                            <div key={index} className='lastLeftPart' id={index} onClick={this.generateMine}>
                                <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                            </div>
                            )
                        } else if (index < lineLength) {
                            return (
                                <div key={index} className='topPart' id={index} onClick={this.generateMine}>
                                    <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                                </div>
                            )
                        } else if ((index%(lineLength)) == 0) {
                            return (
                                <div key={index} className='leftPart' id={index} onClick={this.generateMine}>
                                    <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                                </div>
                            )
                        } else if((index%(lineLength)) == (lineLength - 1)) {
                            return (
                                <div key={index} className='rightPart' id={index} onClick={this.generateMine}>
                                    <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                                </div>
                            )
                        } else if(index > landSize - lineLength) {
                            return (
                                <div key={index} className='bottomPart' id={index} onClick={this.generateMine}>
                                    <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className='defaultPart' id={index} onClick={this.generateMine}>
                                    <Part id={value} func={this.checkGameOver} onClick={this.generateMine} partMode={this.state.partsModeArry[index]}/>
                                </div>
                            )
                        }
                        
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