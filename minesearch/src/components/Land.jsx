import { Component, useState } from 'react';
// import cell from './cell';
import Cell from './Cell';

import '../css/land.css'


// Todo: cell align
class Land extends Component {
    
    static a = ['asd', 'zxc'];
    mine = '💣';
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
            isGenerateCells: false,
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


    f_init_game_setting = () => {

        this.setState((props) => {
            return {
            curGameLevel: props.curGameLevel,
            totalMineCount: this.state.mineCountCategory[props.curGameLevel],
            landSize: this.state.landSizeCategory[props.curGameLevel],
            lineLength: this.state.lineLengthCategory[props.curGameLevel],
            horizontalLength: this.state.horizontalLengthCategory[props.curGameLevel],
            verticalLength: this.state.verticalLengthCategory[props.curGameLevel],
            cellsId: [...Array(this.state.landSizeCategory[props.curGameLevel]).keys()],
            
            };
        })
    }

    f_drawLand = () => {

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



    // Game over
    f_checkGameOver = (e) => {
        console.log(e);
    }


    // Todo: Auto landSize set by game level // Done
    // Todo: Generate entire cell array

    f_generateMine = (e) => {

        if(this.state.isGenerateCells)
            return;
        
        const landSize = this.state.landSize;
        const totalMineCount = this.state.totalMineCount;

        const cells = new Array(landSize);

        const selectedCellNum = this.f_getCellNumber(e.target.id);

        console.log('selectedNum : '+selectedCellNum);
        var leftMineCount = totalMineCount;
        var leftCells = landSize - 1; // Exclude selected cell

        console.log('Generate : ' + landSize);

        const test = ['asd', 'zxc', 'qwe']
        // Probability
        // Todo: Complete array gen
        var random = 0;
        var standNum = 0;
        var maxSize = 10; // state
        var count = 0;

        cells[selectedCellNum] = 0;

        for (var i = 0; i < landSize; i++) {

            if (i == selectedCellNum)
                continue;

            standNum = leftMineCount/leftCells;
            random = Math.random(99);

            // Print ratio
            // console.log(`index: ${i+1}, left cell: ${leftCells}, left mine: ${leftMineCount}`)
            // console.log('Mine Probability : ' + (standNum*100).toFixed(1) +'%');
            // console.log('');

            if (standNum === 0) {
                cells.fill(0, i);
                break;
            }

            if (random <= standNum) {   // Mine
                cells[i] = this.mine;
                leftCells--;
                leftMineCount--;
            } else {                    // Not mine
                cells[i] = 0;
                leftCells--;
            } 
        }
        console.log(cells);

        this.setState({
            cellTypeArray: cells,
        })
    }


    f_generateCells = (e) => {
        
        console.log('generateCells');
        var cells = this.state.cellTypeArray;
        const verticalLength = this.state.verticalLength;
        const horizontalLength = this.state.horizontalLength;

        //const wrapperCellId = e.target.id;
        const virtualCells = cells;
        
        for (var cellNumber in cells) {
            const isMineSelectedCell = this.f_isMineCell(cellNumber);
            // if (isMineSelectedCell)
            //     console.log('isMineIndex : '+cellNumber);
            if (isMineSelectedCell) {
                this.f_setCellTypeMineAround(parseInt(cellNumber), virtualCells);
            }
        }
        
        //virtualCells[300] = 0;
        // console.log('virtualCells : '+virtualCells);
        this.setState({
            cellTypeArray: virtualCells,
        })
    }

    f_isMineCell = (cellNumber) => {
        //const cells = 
        //const cellId = this.f_getCellNumber(wrapperCellId);
        // console.log(cellNumber);
        // if (this.state.cellTypeArray[cellNumber] === this.mine)
        //     console.log('isMineIndex : '+cellNumber);

        const ret = (this.state.cellTypeArray[cellNumber] === this.mine);

        return ret;
    }

    f_setCellTypeMineAround = (cellNumber, virtualCells) => {
        // console.log('cellNumber : '+cellNumber);
        const newLineSize = this.state.horizontalLength;
        console.log('newLine : '+newLineSize)
        // cellNumber - 1 left
        // cellNumber + 1 right
        // cellNumber - this.state.verticalLength top
        // cellNumber - this.state.verticalLength - 1 top left
        // cellNumber - this.state.verticalLength + 1 top right
        // cellNumber + this.state.verticalLength bottom
        // cellNumber + this.state.verticalLength - 1 bottom left
        // cellNumber + this.state.verticalLength + 1 bottom right
        
        const leftCell = cellNumber - 1;
        const rightCell = cellNumber + 1;
        const topCell = cellNumber - newLineSize;
        const topLeftCell = cellNumber - newLineSize - 1;
        const topRightCell = cellNumber - newLineSize + 1;
        const bottomCell = cellNumber + newLineSize;
        const bottomLeftCell = cellNumber + newLineSize - 1;
        const bottomRightCell = cellNumber + newLineSize + 1;
        const virtualCellsLength = this.state.landSize;
        // if (0<=leftCell<=virtualCells.length-1)
        //     virtualCells[leftCell] +=1;
        
        const cellShape = this.f_getCellShape(cellNumber);
        console.log('cellShape : '+cellNumber);
        //virtualCells[rightCell] += 1;
        switch (cellShape)
        {
            case "leftTopCorner":
                virtualCells[rightCell] = (virtualCells[rightCell] !== this.mine) ? virtualCells[rightCell] +=1 : virtualCells[rightCell];
                virtualCells[bottomCell] = (virtualCells[bottomCell] !== this.mine) ? virtualCells[bottomCell] +=1 : virtualCells[bottomCell];
                virtualCells[bottomRightCell] = (virtualCells[bottomRightCell] !== this.mine) ? virtualCells[bottomRightCell] +=1 : virtualCells[bottomRightCell];
                break;
            case "rightTopCorner":
                virtualCells[leftCell] = (virtualCells[leftCell] !== this.mine) ? virtualCells[leftCell] +=1 : virtualCells[leftCell];
                virtualCells[bottomCell] = (virtualCells[bottomCell] !== this.mine) ? virtualCells[bottomCell] +=1 : virtualCells[bottomCell];
                virtualCells[bottomLeftCell] = (virtualCells[bottomLeftCell] !== this.mine) ? virtualCells[bottomLeftCell] +=1 : virtualCells[bottomLeftCell];
                break;
            case "rightBottomCorner":
                virtualCells[leftCell] = (virtualCells[leftCell] !== this.mine) ? virtualCells[leftCell] +=1 : virtualCells[leftCell];
                virtualCells[topCell] = (virtualCells[topCell] !== this.mine) ? virtualCells[topCell] +=1 : virtualCells[topCell];
                virtualCells[topLeftCell] = (virtualCells[topLeftCell] !== this.mine) ? virtualCells[topLeftCell] +=1 : virtualCells[topLeftCell];
                break;
            case "leftBottomCorner":
                virtualCells[topCell] = (virtualCells[topCell] !== this.mine) ? virtualCells[topCell] +=1 : virtualCells[topCell];
                virtualCells[rightCell] = (virtualCells[rightCell] !== this.mine) ? virtualCells[rightCell] +=1 : virtualCells[rightCell];
                virtualCells[topRightCell] = (virtualCells[topRightCell] !== this.mine) ? virtualCells[topRightCell] +=1 : virtualCells[topRightCell];
                break;
            case "topSide":
                virtualCells[leftCell] = (virtualCells[leftCell] !== this.mine) ? virtualCells[leftCell] +=1 : virtualCells[leftCell];
                virtualCells[rightCell] = (virtualCells[rightCell] !== this.mine) ? virtualCells[rightCell] +=1 : virtualCells[rightCell];
                virtualCells[bottomCell] = (virtualCells[bottomCell] !== this.mine) ? virtualCells[bottomCell] +=1 : virtualCells[bottomCell];
                virtualCells[bottomLeftCell] = (virtualCells[bottomLeftCell] !== this.mine) ? virtualCells[bottomLeftCell] +=1 : virtualCells[bottomLeftCell];
                virtualCells[bottomRightCell] = (virtualCells[bottomRightCell] !== this.mine) ? virtualCells[bottomRightCell] +=1 : virtualCells[bottomRightCell];
                break;
            case "rightSide":
                virtualCells[leftCell] = (virtualCells[leftCell] !== this.mine) ? virtualCells[leftCell] +=1 : virtualCells[leftCell];
                virtualCells[topCell] = (virtualCells[topCell] !== this.mine) ? virtualCells[topCell] +=1 : virtualCells[topCell];
                virtualCells[bottomCell] = (virtualCells[bottomCell] !== this.mine) ? virtualCells[bottomCell] +=1 : virtualCells[bottomCell];
                virtualCells[topLeftCell] = (virtualCells[topLeftCell] !== this.mine) ? virtualCells[topLeftCell] +=1 : virtualCells[topLeftCell];
                virtualCells[bottomLeftCell] = (virtualCells[bottomLeftCell] !== this.mine) ? virtualCells[bottomLeftCell] +=1 : virtualCells[bottomLeftCell];
                break;
            case "bottomSide":
                virtualCells[leftCell] = (virtualCells[leftCell] !== this.mine) ? virtualCells[leftCell] +=1 : virtualCells[leftCell];
                virtualCells[rightCell] = (virtualCells[rightCell] !== this.mine) ? virtualCells[rightCell] +=1 : virtualCells[rightCell];
                virtualCells[topCell] = (virtualCells[topCell] !== this.mine) ? virtualCells[topCell] +=1 : virtualCells[topCell];
                virtualCells[topLeftCell] = (virtualCells[topLeftCell] !== this.mine) ? virtualCells[topLeftCell] +=1 : virtualCells[topLeftCell];
                virtualCells[topRightCell] = (virtualCells[topRightCell] !== this.mine) ? virtualCells[topRightCell] +=1 : virtualCells[topRightCell];
                break;
            case "leftSide":
                virtualCells[topCell] = (virtualCells[topCell] !== this.mine) ? virtualCells[topCell] +=1 : virtualCells[topCell];
                virtualCells[rightCell] = (virtualCells[rightCell] !== this.mine) ? virtualCells[rightCell] +=1 : virtualCells[rightCell];
                virtualCells[bottomCell] = (virtualCells[bottomCell] !== this.mine) ? virtualCells[bottomCell] +=1 : virtualCells[bottomCell];
                virtualCells[topRightCell] = (virtualCells[topRightCell] !== this.mine) ? virtualCells[topRightCell] +=1 : virtualCells[topRightCell];
                virtualCells[bottomRightCell] = (virtualCells[bottomRightCell] !== this.mine) ? virtualCells[bottomRightCell] +=1 : virtualCells[bottomRightCell];
                break;
            case "centerCell":
                virtualCells[topCell] = (virtualCells[topCell] !== this.mine) ? virtualCells[topCell] +=1 : virtualCells[topCell];
                virtualCells[rightCell] = (virtualCells[rightCell] !== this.mine) ? virtualCells[rightCell] +=1 : virtualCells[rightCell];
                virtualCells[bottomCell] = (virtualCells[bottomCell] !== this.mine) ? virtualCells[bottomCell] +=1 : virtualCells[bottomCell];
                virtualCells[leftCell] = (virtualCells[leftCell] !== this.mine) ? virtualCells[leftCell] +=1 : virtualCells[leftCell];
                virtualCells[topLeftCell] = (virtualCells[topLeftCell] !== this.mine) ? virtualCells[topLeftCell] +=1 : virtualCells[topLeftCell];
                virtualCells[topRightCell] = (virtualCells[topRightCell] !== this.mine) ? virtualCells[topRightCell] +=1 : virtualCells[topRightCell];
                virtualCells[bottomLeftCell] = (virtualCells[bottomLeftCell] !== this.mine) ? virtualCells[bottomLeftCell] +=1 : virtualCells[bottomLeftCell];
                virtualCells[bottomRightCell] = (virtualCells[bottomRightCell] !== this.mine) ? virtualCells[bottomRightCell] +=1 : virtualCells[bottomRightCell];
                break;
            default:
                break;

        }
        // console.log(virtualCells);
        // virtualCells[leftCell] = (virtualCells[leftCell] !== this.mine) ? virtualCells[leftCell] +=1 : virtualCells[leftCell];
        // virtualCells[rightCell] = (virtualCells[rightCell] !== this.mine) ? virtualCells[rightCell] +=1 : virtualCells[rightCell];
        // virtualCells[topCell] = (virtualCells[topCell] !== this.mine) ? virtualCells[topCell] +=1 : virtualCells[topCell];
        // virtualCells[bottomCell] = (virtualCells[bottomCell] !== this.mine) ? virtualCells[bottomCell] +=1 : virtualCells[bottomCell];
        // virtualCells[topLeftCell] = (virtualCells[topLeftCell] !== this.mine) ? virtualCells[topLeftCell] +=1 : virtualCells[topLeftCell];
        // virtualCells[topRightCell] = (virtualCells[topRightCell] !== this.mine) ? virtualCells[topRightCell] +=1 : virtualCells[topRightCell];
        // virtualCells[bottomLeftCell] = (virtualCells[bottomLeftCell] !== this.mine) ? virtualCells[bottomLeftCell] +=1 : virtualCells[bottomLeftCell];
        // virtualCells[bottomRightCell] = (virtualCells[bottomRightCell] !== this.mine) ? virtualCells[bottomRightCell] +=1 : virtualCells[bottomRightCell];
        
        //var isBoundary = virtualCells[left] != ? virtualCells[left] +=1 : "";
        //((virtualCells[left] != "") virtualCells[left] += 1 ? )
            
        // virtualCells[cellNumber - 1]                += 1;
        // virtualCells[cellNumber + 1]                += 1;
        // virtualCells[cellNumber - newLineSize]      += 1;
        // virtualCells[cellNumber - newLineSize + 1]  += 1;
        // virtualCells[cellNumber - newLineSize - 1]  += 1;
        // virtualCells[cellNumber + newLineSize]      += 1;
        // virtualCells[cellNumber + newLineSize + 1]  += 1;
        // virtualCells[cellNumber + newLineSize - 1]  += 1;
        // this.setState({ 
            
        // })
        
        //cell[cellNumber-1] += 1;
    }

    f_getCellShape = (cellNumber) => {
        const horizontalLength = this.state.horizontalLength;
        const landSize = this.state.landSize;
        if (cellNumber == 0)
            return "leftTopCorner";
        else if (cellNumber === (horizontalLength - 1))
            return "rightTopCorner";
        else if (cellNumber === (landSize - 1))
            return "rightBottomCorner";
        else if (cellNumber === (landSize - horizontalLength))
            return "leftBottomCorner";
        else if (cellNumber < horizontalLength)
            return "topSide";
        else if ((cellNumber % horizontalLength) === (horizontalLength - 1))
            return "rightSide";
        else if (cellNumber > (landSize - horizontalLength)) 
            return "bottomSide";
        else if ((cellNumber % horizontalLength) === 0)
            return "leftSide";
        else
            return "centerCell";
    }

    f_isScopeIndex = (index) => {
        return (0<=index<this.state.landSize);
    }
    f_getCellNumber = (cellId) => {
        const cellNumber = cellId.split('_')[1];

        return cellNumber;
    }

    f_resetGame = () => {
        const selectedLevelOption = document.getElementById('startSelect').
        options[document.getElementById('startSelect').selectedIndex].value;
        
        this.setState({
            curGameLevel: selectedLevelOption,
            isGenerateCells: false,
        })
    }
    
    f_btnClickedGameStart = (e) => {
        this.f_resetGame();
        this.f_init_game_setting();
    }

    f_btnClickedCell = async (e) => {

        if (this.state.isGenerateCells) {

        } else {    // First click
            await this.f_generateMine(e);
            await this.f_generateCells(e);
        }
        
        this.setState({
            isGenerateCells: true,
        })
    }

    

    componentDidMount = () => {
        this.f_init_game_setting();
    }

    componentWillUnmount = () => {
    }

    componentDidUpdate = () => {
        this.f_drawLand();
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
                                <div key={index} className='wcell wcell-corner-01' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell} >
                                    {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if (index === (landSize -1)) {
                        return (
                            <div key={index} className='wcell wcell-corner-04' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                            </div> 
                            )
                        } else if (index === horizontalLength -1) {
                            return (
                                <div key={index} className='wcell wcell-corner-02' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                    {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if (index === (landSize - horizontalLength)) {
                        return (
                            <div key={index} className='wcell wcell-corner-03' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                            </div>
                            )
                        } else if (index < horizontalLength) {
                            return (
                                <div key={index} className='wcell wcell-side-01' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                    {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if ((index % horizontalLength) === 0) {
                            return (
                                <div key={index} className='wcell wcell-side-04' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                    {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if((index % horizontalLength) === (horizontalLength - 1)) {
                            return (
                                <div key={index} className='wcell wcell-side-02' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                    {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else if(index > (landSize - horizontalLength)) {
                            return (
                                <div key={index} className='wcell wcell-side-03' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                    {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className='wcell wcell-md-01' id={"wrapperCell_"+index} onClick={this.f_btnClickedCell}>
                                    {this.state.cellTypeArray[index]}<Cell id={"cell_"+index} func={this.checkGameOver} cellType={this.state.cellTypeArray[index]}/>
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
                    <button className='button-start' onClick={this.f_btnClickedGameStart}>Start game</button>
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