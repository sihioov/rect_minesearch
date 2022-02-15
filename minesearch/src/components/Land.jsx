import { Component, useState } from 'react';
// import cell from './cell';
import Cell from './Cell';

import '../css/land.css'


// Todo: Spread 0 cell by click
class Land extends Component {
    
    static a = ['asd', 'zxc'];
    mine = '💣';
    flag = '⛳';
    constructor(props) {
        super(props);
        
        // Add modeCategory state
        
        this.state = {
            // count: '20',
            correctedCellNumber: 0,
            inCorrectedCellNumber: 0,
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
            modeTypeArray: [],
            defaultCellSize: 20 + 4 + 4,    // 20px + 1px(border) + 1px(border)
            sideWidth: 4,                   // 1px(side px) + 1px(another side px)
            isReset: false,
            test: '',
            // innerCellType: 'close',
        }
    }

    // Todo: Rendering reduce
    f_init_game_setting = () => {
        
        // this.setState({
        //     curGameLevel: this.props.curGameLevel,
        //     totalMineCount: this.state.mineCountCategory[this.props.curGameLevel],
        //     landSize: this.state.landSizeCategory[this.props.curGameLevel],
        //     lineLength: this.state.lineLengthCategory[this.props.curGameLevel],
        //     horizontalLength: this.state.horizontalLengthCategory[this.props.curGameLevel],
        //     verticalLength: this.state.verticalLengthCategory[this.props.curGameLevel],
        //     cellsId: [...Array(this.state.landSizeCategory[this.props.curGameLevel]).keys()],
        //     modeTypeArray: [...Array(this.state.landSizeCategory[this.props.curGameLevel]).fill('close')],
        // })
        this.setState((props) => {
            return {
            curGameLevel: props.curGameLevel,
            totalMineCount: this.state.mineCountCategory[props.curGameLevel],
            landSize: this.state.landSizeCategory[props.curGameLevel],
            lineLength: this.state.lineLengthCategory[props.curGameLevel],
            horizontalLength: this.state.horizontalLengthCategory[props.curGameLevel],
            verticalLength: this.state.verticalLengthCategory[props.curGameLevel],
            cellsId: [...Array(this.state.landSizeCategory[props.curGameLevel]).keys()],
            modeTypeArray: [...Array(this.state.landSizeCategory[props.curGameLevel]).fill('close')],
            // isReset: false,
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
    f_f_checkCellStatus = (e) => {
        // console.log(e);
    }


    f_generateMine = (e) => {
        console.log('generate 1');
        if(this.state.isGenerateCells)
            return;
            console.log('generate 2');
        this.props.onClick();
        // console.log('????')
        const landSize = this.state.landSize;
        const totalMineCount = this.state.totalMineCount;
        const horizontalLength = this.state.horizontalLength;
        const cells = new Array(landSize);
        // console.log('landSize : '+landSize);
        cells.fill(0);
        
        const selectedCellNum = this.f_getCellNumber(e.currentTarget.id);
        // console.log('Target OD : '+e.currentTarget.id);

        // console.log('selectedNum : '+selectedCellNum);
        var leftMineCount = totalMineCount;
        var leftCells = landSize - 1; // Exclude selected cell

        // console.log('Generate : ' + landSize);

        const test = ['asd', 'zxc', 'qwe']
        // Probability
        // Todo: Complete array gen
        var random = 0;
        var standNum = 0;
        var maxSize = 10; // state
        var count = 0;

        //const cellShape = this.f_getCellShape(selectedCellNum);
        // console.log('selecteddCell : '+selectedCellNum);
        const excludedCell = this.f_getAroundCellArray(selectedCellNum);
        leftCells -= excludedCell.length;   // Exclude select cell around
        // console.log('excludeCellArray : '+excludedCell);
        cells[selectedCellNum] = 0;
        // console.log('cells : '+cells);
        
        for (var i = 0; i < landSize; i++) {
            
            if (excludedCell.find(element => element == i) || i == selectedCellNum)
            {
                // console.log('exclude!! : ');
                continue;
            }
                
            // for (var itemz in excludedCell) 
            // {
            //     // console.log(itemz);
            //     if (i == itemz)
            //         continue;
            // }
            // Not mine cell around
            // if ((i == selectedCellNum) || 
            //     i == (selectedCellNum-1) || // left
            //     i == (selectedCellNum+1) || // right
            //     i == (selectedCellNum - horizontalLength) || // top
            //     i == (selectedCellNum - horizontalLength - 1) || // topLeft
            //     i == (selectedCellNum - horizontalLength + 1) || // topRight
            //     i == (selectedCellNum + horizontalLength) || // bottom
            //     i == (selectedCellNum + horizontalLength - 1) || // bottomLeft
            //     i == (selectedCellNum + horizontalLength + 1))
            // {
            //     //cells[i] = 0;
            //     continue;
            // }
            

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
        // console.log(cells);

        this.setState({
            cellTypeArray: cells,
            isGenerateCells: true,
        })
    }
    
    f_getAroundCellArray = (inputCellNumber) => {
        // console.log('f_getAroundCellArray')
        var cellNumber = parseInt(inputCellNumber)
        const cellShape = this.f_getCellShape(cellNumber);
        const resultArray = [];
        const horizontalLength = this.state.horizontalLength;
        // console.log('cellNumber : '+cellNumber);
        switch (cellShape)
        {
            case "leftTopCorner":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber + 1);
                resultArray.push(cellNumber + horizontalLength);
                resultArray.push(cellNumber + horizontalLength + 1);
                break;
            case "rightTopCorner":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber - 1);
                resultArray.push(cellNumber + horizontalLength);
                resultArray.push(cellNumber + horizontalLength - 1);
                break;
            case "rightBottomCorner":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber - 1);
                resultArray.push(cellNumber - horizontalLength);
                resultArray.push(cellNumber - horizontalLength - 1);
                break;
            case "leftBottomCorner":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber - horizontalLength);
                resultArray.push(cellNumber - horizontalLength + 1);
                resultArray.push(cellNumber + 1);
                break;
            case "topSide":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber - 1);
                resultArray.push(cellNumber + 1);
                resultArray.push(cellNumber + horizontalLength - 1);
                resultArray.push(cellNumber + horizontalLength + 1);
                resultArray.push(cellNumber + horizontalLength);
                break;
            case "rightSide":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber - 1);
                resultArray.push(cellNumber + horizontalLength);
                resultArray.push(cellNumber - horizontalLength);
                resultArray.push(cellNumber + horizontalLength - 1);
                resultArray.push(cellNumber - horizontalLength - 1);
                break;
                case "bottomSide":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber - 1);
                resultArray.push(cellNumber + 1);
                resultArray.push(cellNumber - horizontalLength);
                resultArray.push(cellNumber - horizontalLength - 1);
                resultArray.push(cellNumber - horizontalLength + 1);
                break;
            case "leftSide":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber + 1);
                resultArray.push(cellNumber - horizontalLength);
                resultArray.push(cellNumber + horizontalLength);
                resultArray.push(cellNumber - horizontalLength + 1);
                resultArray.push(cellNumber + horizontalLength + 1);
                break;
                case "centerCell":
                resultArray.push(cellNumber);
                resultArray.push(cellNumber - 1);
                resultArray.push(cellNumber + 1);
                resultArray.push(cellNumber - horizontalLength);
                resultArray.push(cellNumber + horizontalLength);
                resultArray.push(cellNumber - horizontalLength + 1);
                resultArray.push(cellNumber + horizontalLength + 1);
                resultArray.push(cellNumber - horizontalLength - 1);
                resultArray.push(cellNumber + horizontalLength - 1);
                break;
            default:
                break;
        }
        // console.log('result : '+resultArray);
        return resultArray;
    }

    f_generateCells = (e) => {
        
        // console.log('generateCells');
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
        const isMine = (this.state.cellTypeArray[cellNumber] === this.mine);
        return isMine;
    }

    
    f_isAroundFlagCorrect = (id) => {

        const wcellNum = this.f_getCellNumber(id);
        const aroundArry = this.f_getAroundCellArray(wcellNum);
        const wcellId = 'wrapperCell_'+wcellNum;
        const wcellText = document.getElementById(wcellId).textContent;

        
        
        // const targetText = 
        // const objId = ''
        var count = 0;
        for (var obj of aroundArry) {
            const cellId = this.f_getCellIdByNum(obj);
            if (document.getElementById(cellId).textContent==this.flag)
                count++;
        }
        
        
        if (count == wcellText) {
            const modeTypeArry = this.state.modeTypeArray;
            for (var value of aroundArry) {
                var aroundCellArry = this.f_getAroundCellArray(value);
                if (document.getElementById('cell_'+value).textContent === this.flag)
                    continue;
                // console.log('aroundCellArry : '+aroundArry)
                // console.log('value : '+value)
                // console.log('value value : '+aroundCellArry[value]);
                if (this.state.cellTypeArray[value] === 0) {
                    // console.log('aaa')
                    this.f_cellOpenSpread(aroundCellArry);
                } 
                else {
                    // console.log('bbb')
                    modeTypeArry[value] = 'open';
                    this.f_changeOpendCellColor(value);
                    this.setState({
                        modeTypeArray: modeTypeArry,
                    })
                }

                // console.log('textContext : '+document.getElementById('cell_'+index).textContent)
                
            }
            
            
            
            console.log(modeTypeArry);
            // this.state.modeTypeArray[wcellNum]
            // console.log('Excute!!');
        }



    }
    
    f_incCellWeightByDirection = (direction, cell) => {
        cell[direction] = (cell[direction] !== this.mine) ? cell[direction] += 1 : cell[direction];
        //console.log('aaaa')
    }

    f_setCellTypeMineAround = (cellNumber, virtualCells) => {

        const newLineSize = this.state.horizontalLength;

        const left = cellNumber - 1;
        const right = cellNumber + 1;
        const top = cellNumber - newLineSize;
        const topLeft = cellNumber - newLineSize - 1;
        const topRight = cellNumber - newLineSize + 1;
        const bottom = cellNumber + newLineSize;
        const bottomLeft = cellNumber + newLineSize - 1;
        const bottomRight = cellNumber + newLineSize + 1;
        const virtualCellsLength = this.state.landSize;
        // if (0<=leftCell<=virtualCells.length-1)
        //     virtualCells[leftCell] +=1;
        
        const cellShape = this.f_getCellShape(cellNumber);
        // console.log('cellShape : '+cellNumber);
        //virtualCells[rightCell] += 1;

        

        switch (cellShape)
        {
            case "leftTopCorner":
                this.f_incCellWeightByDirection(right, virtualCells);
                this.f_incCellWeightByDirection(bottom, virtualCells);
                this.f_incCellWeightByDirection(bottomRight, virtualCells);
                break;
            case "rightTopCorner":
                this.f_incCellWeightByDirection(left, virtualCells);
                this.f_incCellWeightByDirection(bottom, virtualCells);
                this.f_incCellWeightByDirection(bottomLeft, virtualCells);
                break;
            case "rightBottomCorner":
                this.f_incCellWeightByDirection(left, virtualCells);
                this.f_incCellWeightByDirection(top, virtualCells);
                this.f_incCellWeightByDirection(topLeft, virtualCells);
                break;
            case "leftBottomCorner":
                this.f_incCellWeightByDirection(top, virtualCells);
                this.f_incCellWeightByDirection(right, virtualCells);
                this.f_incCellWeightByDirection(topRight, virtualCells);
                break;
            case "topSide":
                this.f_incCellWeightByDirection(left, virtualCells);
                this.f_incCellWeightByDirection(right, virtualCells);
                this.f_incCellWeightByDirection(bottom, virtualCells);
                this.f_incCellWeightByDirection(bottomLeft, virtualCells);
                this.f_incCellWeightByDirection(bottomRight, virtualCells);
                break;
            case "rightSide":
                this.f_incCellWeightByDirection(left, virtualCells);
                this.f_incCellWeightByDirection(top, virtualCells);
                this.f_incCellWeightByDirection(bottom, virtualCells);
                this.f_incCellWeightByDirection(topLeft, virtualCells);
                this.f_incCellWeightByDirection(bottomLeft, virtualCells);
                break;
            case "bottomSide":
                this.f_incCellWeightByDirection(left, virtualCells);
                this.f_incCellWeightByDirection(right, virtualCells);
                this.f_incCellWeightByDirection(top, virtualCells);
                this.f_incCellWeightByDirection(topLeft, virtualCells);
                this.f_incCellWeightByDirection(topRight, virtualCells);
                break;
            case "leftSide":
                this.f_incCellWeightByDirection(top, virtualCells);
                this.f_incCellWeightByDirection(right, virtualCells);
                this.f_incCellWeightByDirection(bottom, virtualCells);
                this.f_incCellWeightByDirection(topRight, virtualCells);
                this.f_incCellWeightByDirection(bottomRight, virtualCells);
                break;
            case "centerCell":
                this.f_incCellWeightByDirection(top, virtualCells);
                this.f_incCellWeightByDirection(right, virtualCells);
                this.f_incCellWeightByDirection(bottom, virtualCells);
                this.f_incCellWeightByDirection(left, virtualCells);
                this.f_incCellWeightByDirection(topLeft, virtualCells);
                this.f_incCellWeightByDirection(topRight, virtualCells);
                this.f_incCellWeightByDirection(bottomLeft, virtualCells);
                this.f_incCellWeightByDirection(bottomRight, virtualCells);
                break;
            default:
                break;

        }
    }

    f_getCellShape = (cellNumber) => {
        const horizontalLength = this.state.horizontalLength;
        const landSize = this.state.landSize;
        if (cellNumber == 0)
            return "leftTopCorner";
        else if (cellNumber == (horizontalLength - 1))
            return "rightTopCorner";
        else if (cellNumber == (landSize - 1))
            return "rightBottomCorner";
        else if (cellNumber == (landSize - horizontalLength))
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

    f_getWcellIdIdByNum = (cellNumber) => {
        return `wapperCell_${cellNumber}`;
    }

    f_getCellIdByNum = (cellNumber) => {
        return `cell_${cellNumber}`;
    }

    f_reset_game = () => {
        const selectedLevelOption = document.getElementById('startSelect').
        options[document.getElementById('startSelect').selectedIndex].value;
        
        const landSize = this.state.landSize;

        // Land re-init draw
        for (var i = 0; i<landSize; i++) {
            this.f_changeClosedCellColor(i);
            //document.getElementById('wrapperCell_'+landSize).textContent = '';
        }

        this.setState({
            curGameLevel: selectedLevelOption,
            totalMineCount: this.state.mineCountCategory[this.state.curGameLevel],
            landSize: this.state.landSizeCategory[this.state.curGameLevel],
            lineLength: this.state.lineLengthCategory[this.state.curGameLevel],
            horizontalLength: this.state.horizontalLengthCategory[this.state.curGameLevel],
            verticalLength: this.state.verticalLengthCategory[this.state.curGameLevel],
            cellsId: [...Array(this.state.landSizeCategory[this.state.curGameLevel]).keys()],
            modeTypeArray: [Array(this.state.landSizeCategory[this.state.curGameLevel]).fill('close')],
            cellTypeArray: [Array(this.state.landSizeCategory[this.state.curGameLevel]).fill(0)],
            isGenerateCells: false,
            // isReset: true,
        })
    }
    
    f_clickedBtnGameStart = (e) => {
        this.f_reset_game();
        this.f_init_game_setting();
    }
    
    f_downedWrapCellBox = (e) => {
        console.log('downedWrapCell');
        // console.log('console : '+e.target.id)
        // if (e.button === 2) {
        //     const selectedCellNum = this.f_getCellNumber(e.currentTarget.id);
        //     const selectedCellId = `cell_${selectedCellNum}`;
        //     var selectedCell = document.getElementById(selectedCellId);
        //     // console.log('1!!!!'+selectedCellText)
        //     if (selectedCell.textContent === this.flag) {
        //         // console.log(selectedCellNum)
        //         console.log('togle1');
        //         selectedCell = '';
        //     } else {
        //         selectedCell = this.flag;
        //     }

        //     // console.log('selectedCell : '+selectedCell.textContent);

        // }
    }

    f_downedBtnStart = (e) => {
        console.log('downedBtnStart')
        // setTimeout(() => {
        //     this.setState({isReset : true})
        // }, 100)
        
    }

    f_upBtnStart = (e) => {
        console.log('upbtnStart');
        // setTimeout(() => {
        //     this.setState({isReset : false})
        // }, 100)
    }

    f_clickedWrapCellBox = async (e) => {
        
        // Todo: Is this return when opend?
        // const selectedCellNum = this.f_getCellNumber(e.currentTarget.id);
        // const selectedCellId = `cell_${selectedCellNum}`;
        // const selectedCell = document.getElementById(selectedCellId);
        // // console.log('which : '+e.which);

        // // No response, if cell is falg
        // if (selectedCell.textContent === this.flag)
        //     return;

        
        //     // console.log('button1213 : '+e.buttons);
        // // Both click
        // if (e.buttons === 2 && this.state.modeTypeArray[selectedCellNum] === 'open') {
        //     this.f_isAroundFlagCorrect(e.target.id);
        //     return;
        // }

        // const aroundCellArry = this.f_getAroundCellArray(selectedCellNum);
        // // console.log('selectedNum : '+arry);        
        // // this.f_cellOpenSpread(arry);
        // const arry = this.state.modeTypeArray;
        // if (this.state.isGenerateCells) {
        //     //const id = document.getElementById(e.target.id);
        //     arry[selectedCellNum] = 'open';
        //     this.setState({modeTypeArray: arry})
            
        //     if (this.state.cellTypeArray[selectedCellNum] === 0) {
        //         this.f_cellOpenSpread(aroundCellArry);
        //     }
        //     this.f_changeOpendCellColor(selectedCellNum);
        //     // this.setState({})
            
        // } else {    // First click
        //     // console.log('target : '+e.target.id);
        //     await this.f_generateMine(e);
        //     await this.f_generateCells(e);
        //     // for (var items of arry) {
        //     //     console.log(items);
        //     // }
        //     this.f_cellOpenSpread(aroundCellArry);
        //     this.setState({isGenerateCells: true,})
        // }

        await this.f_generateMine(e);
        await this.f_generateCells(e);
    }


    // Recursion
    f_cellOpenSpread = async (aroundCellArry) => {
        
        const cellTypeArry = this.state.cellTypeArray;
        const modeTypeArry = this.state.modeTypeArray;
        var nextAroundCellArry = [];
        // console.log('cellTypeArry : '+cellTypeArry)
        for (var cellNumber of aroundCellArry) {
            // console.log('Recursion')
            if (cellTypeArry[cellNumber] === 0 && modeTypeArry[cellNumber] === 'close') {
                nextAroundCellArry = await this.f_getAroundCellArray(cellNumber);
                // nextAroundCellArry.remove(0);
                // nextAroundCellArry.shift();
                // console.log('next : '+nextAroundCellArry);
                modeTypeArry[cellNumber] = 'open';

                // shlim_render
                this.setState({modeTypeArray: modeTypeArry});
                await this.f_cellOpenSpread(nextAroundCellArry);
                await this.f_changeOpendCellColor(cellNumber);
                //this.setState({modeTypeArray: nextAroundCellArry});
            } else if (cellTypeArry[cellNumber] !== 0 && cellTypeArry[cellNumber] !== this.mine && modeTypeArry[cellNumber] === 'close') {
                modeTypeArry[cellNumber] = 'open';

                // shlim_render
                await this.f_changeOpendCellColor(cellNumber);
                this.setState({modeTypeArray: modeTypeArry});
            } else {
                continue;
            }
            // if ()
        }
    }


    f_changeClosedCellColor = (cellNumber) => {
        
        const wcellId = `wrapperCell_${cellNumber}`;
        const wcellStyle = document.getElementById(wcellId).style;
        // height: 20px;
        // width: 20px;
        // border: 4px solid transparent;
        // align-items: center;
        // float: left;
        // text-align: center;
        // border-color:white darkgrey darkgrey white;

        wcellStyle.border = `4px solid #ECD8E6`;
        wcellStyle.borderColor = 'white darkgrey darkgrey white';
        wcellStyle.width = '20px';
        wcellStyle.height = '20px';
    }

    f_changeOpendCellColor = (cellNumber) => {
        const wcellId = `wrapperCell_${cellNumber}`;
        const wcellStyle = document.getElementById(wcellId).style;

        wcellStyle.border = `1px solid #FFF7FF`;
        wcellStyle.borderColor = 'grey';
        wcellStyle.width = '26px';
        wcellStyle.height = '26px';
        // wcellStyle.width = '23px';
        // this.setState({defaultCellSize: 26})
        // wcellStyle.height = '23px';


        // this.setState({defaultCellSize: this.state.defaultCellSize - 6})
        // wcellStyle.border = '1px';
        // console.log('wcelId : '+wcellId);
    }

    f_overedWrapCellBox = (e) => {
        const selectedNum = this.f_getCellNumber(e.target.id);
        

        
        const selectedCellId = `cell_${selectedNum}`;
        const cell = document.getElementById(selectedCellId);
        if (this.state.modeTypeArray[selectedNum] === 'open') {
            return;
        } else {
            cell.style.backgroundColor = '#FFF7FF';
        }
        
        // const wcell = document.getElementById(e.target.id);
        
        // wcell.style.backgroundColor = '#FFF7FF';
    }

    f_leavedWrapCellBox = (e) => {
        // const wcell = document.getElementById(e.currentTarget.id);
        const selectedNum = this.f_getCellNumber(e.target.id);
        
        const selectedCellId = `cell_${selectedNum}`;
        const cell = document.getElementById(selectedCellId);
        if (this.state.modeTypeArray[selectedNum] === 'open')
        {
            return;
        } else {
            cell.style.backgroundColor = '#ECD8E6';
        }
            
        
        // console.log(selectedNum);
        // wcell.style.backgroundColor = '#ECD8E6';
    }


    f_checkCellStatus = (statusObject) => {
        // console.log(statusObject);
        if (statusObject.isGameOVer === true) {
            alert('GameOver');
        }
        // if (isCorrect) this.setState({correctedCellNumber: this.state.correctedCellNumber + 1})
        // else this.setState({inCorrectedCellNumber: this.state.inCorrectedCellNumber + 1})

        // if (this.state.correctedCellNumber + this.state.inCorrectedCellNumber === this.state.landSize) {
        //     ((this.state.correctedCellNumber) === this.state.landSize ? this.f_gameClear() : this.f_gameOver())
        // }
    }

    f_wcellMouseOver = (e) => {
        // documnet.get
        
    }

    f_gameClear = () => {
        
    }

    f_gameOver = () => {
        
    }

    componentDidMount = () => {
        this.f_init_game_setting();
    }

    componentWillUnmount = () => {

    }

    componentDidUpdate = () => {
        this.f_drawLand();
        // console.log('1111');
    }
    
    render() {
        console.log('Land rendring')
        
        const horizontalLength = this.state.horizontalLength; 
        const landSize = this.state.landSize;

        return (
            <>
                <div className='land' id='land' >
                    {this.state.cellsId.map((value, index) => {
                        if (index === 0) {
                            // console.log('index : '+(landSize - lineLength));
                            return (
                                <div key={index} className='wcell wcell-corner-01' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox} onMouseDown={this.f_downedWrapCellBox} >
                                    {/* {this.state.cellTypeArray[index]} */}
                                    <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset} />
                                </div>
                            )
                        } else if (index === (landSize -1)) {
                        return (
                            <div key={index} className='wcell wcell-corner-04' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                {/* {this.state.cellTypeArray[index]} */}
                                <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
                            </div> 
                            )
                        } else if (index === horizontalLength -1) {
                            return (
                                <div key={index} className='wcell wcell-corner-02' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                    {/* {this.state.cellTypeArray[index]} */}
                                    <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
                                </div>
                            )
                        } else if (index === (landSize - horizontalLength)) {
                        return (
                            <div key={index} className='wcell wcell-corner-03' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                {/* {this.state.cellTypeArray[index]} */}
                                <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
                            </div>
                            )
                        } else if (index < horizontalLength) {
                            return (
                                <div key={index} className='wcell wcell-side-01' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                    {/* {this.state.cellTypeArray[index]} */}
                                    <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
                                </div>
                            )
                        } else if ((index % horizontalLength) === 0) {
                            return (
                                <div key={index} className='wcell wcell-side-04' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                    {/* {this.state.cellTypeArray[index]} */}
                                    <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
                                </div>
                            )
                        } else if((index % horizontalLength) === (horizontalLength - 1)) {
                            return (
                                <div key={index} className='wcell wcell-side-02' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                    {/* {this.state.cellTypeArray[index]} */}
                                    <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
                                </div>
                            )
                        } else if(index > (landSize - horizontalLength)) {
                            return (
                                <div key={index} className='wcell wcell-side-03' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                    {/* {this.state.cellTypeArray[index]} */}
                                    <Cell cellId={"cell_"+index} onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className='wcell wcell-md-01' id={"wrapperCell_"+index} onClick={this.f_clickedWrapCellBox} onMouseOver={this.f_overedWrapCellBox} onMouseLeave={this.f_leavedWrapCellBox}>
                                    {/* {this.state.cellTypeArray[index]} */}
                                    <Cell cellId={"cell_"+index}  onCheck={this.f_checkCellStatus} cellType={this.state.cellTypeArray[index]} mode={this.state.modeTypeArray[index]} isReset={this.state.isReset}/>
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
                    <button className='button-start' onClick={this.f_clickedBtnGameStart} onMouseDown={this.f_downedBtnStart} onMouseUp={this.f_upBtnStart}>Start game</button>
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