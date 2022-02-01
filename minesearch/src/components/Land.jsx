import { Component } from 'react';
// import cell from './cell';
import Cell from './Cell';

import '../css/land.css'


// Todo: cell align
class Land extends Component {
    
    static a = ['asd', 'zxc'];

    constructor(props) {
        super(props);

        // Add modeCategory state
        this.state = {
            count: '20',
            cellsId: [], // Todo: Auto set cells by level
            curLevel: this.props.curLevel,
            totalMineCount: 0,
            mineCountCategory: [10,40,99],
            initCell: '',
            isGenerateMine: false,
            landSize: '',
            landSizeCategory: [9*9, 16*16, 16*30],
            lineLengthCategory: [9, 16, 16],
            lineLength:'',
            horizontalCategory: [9, 16, 30],
            horizontalLength:'',
            verticalCategory:[9, 16, 16],
            verticalLength: '',
            cellsModeArry: [],
        }
    }

    // Initial game setting
    init_game_setting = () => {
        this.setState({
            totalMineCount: this.state.mineCountCategory[this.state.curLevel],
            landSize: this.state.landSizeCategory[this.state.curLevel],
            lineLength: this.state.lineLengthCategory[this.state.curLevel],
            cellsId: [...Array(this.state.landSizeCategory[this.state.curLevel]).keys()],
        })
        console.log('this landsize : '+this.state.landSize);
    }

    // Game over
    checkGameOver = (e) => {
        console.log(e);
    }


    
    rendercells = (e) => {

    }

    // Todo: Auto landSize set by gmae level
    // Todo: Generate entire cell array

    generateMine = (e) => {

        if(this.state.isGenerateMine)
            return;        
        
        const landSize = this.state.landSize;
        const totalMineCount = this.state.totalMineCount;

        const cells = new Array(landSize);
        var leftMineCount = totalMineCount;
        var leftCells = landSize;
        console.log('Generate : '+landSize);
        const test = ['asd', 'zxc', 'qwe']
        // Probability
        // Todo: Complete array gen
        var random = 0;
        var standNum = 0;
        var maxSize = 10; // state
        var count = 0;

        for (var i = 0; i < landSize; i++) {

            standNum = leftMineCount/leftCells;
            random = Math.random(99);
            console.log(`index: ${i+1}, left cell: ${leftCells}, left mine: ${leftMineCount}`)
            // console.log('index : '+(i+1)+','+`left cell ${random}`);

            // console.log('left cell : '+leftcells);
            // console.log('left mine '+leftMineCount);
            console.log('Mine Probability : ' + (standNum*100).toFixed(1) +'%');
            console.log('');

            // 
            if (standNum == 0) {
                cells.fill(0, i);
                break;
            }

            if (random <= standNum) {   // Mine
                cells[i] = 'mine';
                leftCells--;
                leftMineCount--;
            } else {                    // Not mine
                cells[i] = 0;
                // cells.push('0');
                leftCells--;
            } 
        }
        console.log(cells);


        this.setState({
            cellsModeArry: cells,
            isGenerateMine: true,
        })
    }


    generatecells = (e) => {
        const cells = this.state.cellsModeArry;
        const verticalLength = this.state.verticalLength;
        const horizontalLength = this.state.horizontalLength;

        // 
        const firstcell = cells[0];
        // const topcell
        
        
        // for (var i = 0; i<)
        // const topcells = cells[]
    }

    // plantMine = (e) => {

    // }

    componentDidMount = () => {

        // Game setting        
        this.init_game_setting();
        //tempArray.from(Array(this.state.landSize).keys())
    }

    render() {
        
        const lineLength = this.state.lineLength;
        const landSize = this.state.landSize;

        return (
            <>
                <div className='land' id='land' >
                    {this.state.cellsId.map((value, index) => {
                        if (index === 0) {
                            // console.log('index : '+(landSize - lineLength));
                            return (
                                <div key={index} className='top-left-corner' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                                </div>
                            )
                        } else if (index === (landSize -1)) {
                        return (
                            <div key={index} className='bottom-right-corner' id={index} onClick={this.generateMine}>
                                <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                            </div> 
                            )
                        } else if (index === lineLength -1) {
                            return (
                                <div key={index} className='top-right-corner' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                                </div>
                            )
                        } else if (index === (landSize - lineLength)) {
                        return (
                            <div key={index} className='bottom-left-corner' id={index} onClick={this.generateMine}>
                                <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                            </div>
                            )
                        } else if (index < lineLength) {
                            return (
                                <div key={index} className='top-side' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                                </div>
                            )
                        } else if ((index % lineLength) === 0) {
                            return (
                                <div key={index} className='left-side' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                                </div>
                            )
                        } else if((index % lineLength) === (lineLength - 1)) {
                            return (
                                <div key={index} className='right-side' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                                </div>
                            )
                        } else if(index > landSize - lineLength) {
                            return (
                                <div key={index} className='bottom-side' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className='center-cell' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellMode={this.state.cellsModeArry[index]}/>
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