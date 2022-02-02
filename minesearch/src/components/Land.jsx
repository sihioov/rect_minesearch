import { Component, useState } from 'react';
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
            // count: '20',
            cellsId: [], // Todo: Auto set cells by level
            curGameLevel: 0,
            totalMineCount: 0,
            mineCountCategory: [10,40,99],
            initCell: '',
            isGenerateMine: false,
            landSize: '',
            landSizeCategory: [9*9, 16*16, 30*16],
            lineLengthCategory: [9, 16, 16],
            lineLength:'',
            horizontalLengthCategory: [9, 16, 30],
            horizontalLength:'',
            verticalLengthCategory:[9, 16, 16],
            verticalLength: '',
            cellTypeArray: [],
            defaultCellSize: 20 + 1 + 1,    // 20px + 1px(border) + 1px(border)
            sideWidth: 2,                   // 1px(side px) + 1px(another side px)
        }
    }

    
    // reinit_game = () => {
    //     this.props.reinit_game(this.state.curGameLevel);
    //     // this.setState({
    //     //     curGameLevel: this.state.curGameLevel,
    //     // })
    // }
    // Initial game setting
    // test = (props) => {
        
    //     this.setState((props) => {
    //         return {curGameLevel: props.curGameLevel};
    //     });
    // }
    
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.curGameLevel !== prevState.curGameLevel) {
    //         return { curGameLevel: nextProps.curGameLevel };
    //     }
    //     return null;   
    // }

    init_game_setting = () => {

        this.setState((props) => {
            return {
            curGameLevel: props.curGameLevel,
            totalMineCount: this.state.mineCountCategory[props.curGameLevel],
            landSize: this.state.landSizeCategory[props.curGameLevel],
            lineLength: this.state.lineLengthCategory[props.curGameLevel],
            horizontalLength: this.state.horizontalLengthCategory[props.curGameLevel],
            verticalLength: this.state.verticalLengthCategory[props.curGameLevel],
            cellsId: [...Array(this.state.landSizeCategory[props.curGameLevel]).keys()]
            };
        })
    }

    draw_land = () => {

        var land = document.getElementsByClassName('land')[0];
        const defaultCellSize  = this.state.defaultCellSize;
        const horizontalLength = this.state.horizontalLengthCategory[this.state.curGameLevel];
        const verticalLength   = this.state.verticalLengthCategory[this.state.curGameLevel];
        const sideWidth      = this.state.sideWidth;
        
        // During rendering, auto set landsize
        land.style.width  = defaultCellSize * horizontalLength + sideWidth +'px';
        land.style.height = defaultCellSize * verticalLength + sideWidth + 'px';

        // Send data to Board component
        this.props.setLandVerticalLength(land.style.width);
    }

    // shouldComponentUpdate = (prevProps, prevState) => {
    //     return this.props.curGameLevel !== prevProps.curGameLevel;
    //     // return true;
    // }

    componentDidUpdate = () => {
        this.draw_land();
    }

    change_game_set = () => {
        this.setState({
            totalMineCount: this.state.mineCountCategory[this.state.curGameLevel],
            // curGameLevel: this.state.curGameLevel,
            landSize: this.state.landSizeCategory[this.state.curGameLevel],
            lineLength: this.state.lineLengthCategory[this.state.curGameLevel],
            horizontalLength: this.state.horizontalLengthCategory[this.state.curGameLevel],
            verticalLength: this.state.verticalLengthCategory[this.state.curGameLevel],
            cellsId: [...Array(this.state.landSizeCategory[this.state.curGameLevel]).keys()],
        });
    }

    // Game over
    checkGameOver = (e) => {
        console.log(e);
    }


    
    rendercells = (e) => {

    }

    // Todo: Auto landSize set by game level // Done
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

            // Print ratio
            // console.log(`index: ${i+1}, left cell: ${leftCells}, left mine: ${leftMineCount}`)
            // console.log('Mine Probability : ' + (standNum*100).toFixed(1) +'%');
            // console.log('');

            // 
            if (standNum === 0) {
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
            cellTypeArray: cells,
            isGenerateMine: true,
        })
    }


    generatecells = (e) => {
        const cells = this.state.cellTypeArray;
        const verticalLength = this.state.verticalLength;
        const horizontalLength = this.state.horizontalLength;

        const firstcell = cells[0];
    }

    
    btnClickedStart = (e) => {
        const selectedLevelOption = document.getElementById('startSelect').options[document.getElementById('startSelect').selectedIndex].value;

        console.log('btn : '+ selectedLevelOption);
        //console.log('Btn clicked : '+selectedLevelOption);
        this.setState({
            curGameLevel: selectedLevelOption,
        })

        this.init_game_setting();
        // this.game_landing();
        console.log('btnclickedstart');
    }

    componentDidMount = () => {
        this.init_game_setting();
    }
    componentWillUnmount = () => {
    }
    componentDidUpdate = () => {
        this.draw_land();
    }
    
    render() {
        
        const horizontalLength = this.state.horizontalLength; 
        const landSize = this.state.landSize;
        

        return (
            <>
                <div className='land' id='land' >
                    {this.state.cellsId.map((value, index) => {
                        if (index === 0) {
                            // console.log('index : '+(landSize - lineLength));
                            return (
                                <div key={index} className='wcell wcell-corner-01' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if (index === (landSize -1)) {
                        return (
                            <div key={index} className='wcell wcell-corner-04' id={index} onClick={this.generateMine}>
                                <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                            </div> 
                            )
                        } else if (index === horizontalLength -1) {
                            return (
                                <div key={index} className='wcell wcell-corner-02' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if (index === (landSize - horizontalLength)) {
                        return (
                            <div key={index} className='wcell wcell-corner-03' id={index} onClick={this.generateMine}>
                                <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                            </div>
                            )
                        } else if (index < horizontalLength) {
                            return (
                                <div key={index} className='wcell wcell-side-01' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if ((index % horizontalLength) === 0) {
                            return (
                                <div key={index} className='wcell wcell-side-04' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if((index % horizontalLength) === (horizontalLength - 1)) {
                            return (
                                <div key={index} className='wcell wcell-side-02' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if(index > landSize - horizontalLength) {
                            return (
                                <div key={index} className='wcell wcell-side-03' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className='wcell wcell-md-01' id={index} onClick={this.generateMine}>
                                    <Cell id={value} func={this.checkGameOver} onClick={this.generateMine} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        }
                        
                    })}
                </div>
                <div id="wrapperSelect">
                    <select className='select-level' id="startSelect" >
                        <option value="0">Easy</option>
                        <option value="1">Normal</option>
                        <option value="2">Hard</option>
                    </select>
                    <button className='button-start' onClick={this.btnClickedStart}>Start game</button>
                    {/* <button onClick={this.gameOptionSet}>Game start</button> */}
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