import { useState, Component } from 'react';
import '../css/cell.css';
import mine from '../resources/mine.png';
// import asset from '../resources/';
import assetPath from '../AssetHelper'

class Cell extends Component {

    __img = ['default', 'normal', '1', '2', 'mine'];
    __className = ['default', 'normal', '1', '2', 'mine'];
    flag = '⛳';
    mine = '💣';
    // cellStatus = ['correct', 'inCorrect', 'gameOver']
    cellStatus = {
        isCorrect: false,
        isGameOVer: false
    }
    constructor(props) {
        super(props);
        // console.log('modetype : '+this.props.mode);
        this.state = {
            cellId: this.props.cellId,
            cell: this.props.cell,
            curImg: this.__img[0],
            mineNumber: 10,
            surfaceCellType: '',
            cellType: this.props.cellType,
            mode: props.mode,
            isCorrect: '',
            cellSize: 20,
            isReset: props.isReset,
        }
    }


    changeCell = (e) => {
        // e.preventDefault();
        // this.changeImgae(e);
        // this.changeFloor(e);
    }

    clickedCell = (e) => {
        e.preventDefault();
        // console.log('Celltyype : '+this.state.cellType);
        if (typeof e === 'object') {
            switch (e.button) {
                // left click
                case 0:
                    this.f_clickedLeftBtn(e);
                    break;
                case 1:
                    // console.log('Click middle btn');
                    break;
                // right click
                case 2:
                    // console.log('Click right btn');
                    this.f_clickedRightBtn(e);
                    
                    break;
                default:
                    console.log('Unknown btn');
                    break;
            }
        }
    }

    selectRelatedCell = (e) => {
        // const cell = e.target.id;
        // console.log('className : '+cell.className);
    }

    f_clickedLeftBtn = (e) => {
        e.preventDefault();
        // console.log('clicked! leftBtn');
        // console.log('Celltyype : '+this.props.cellType);

        // if surface is flaged, skip event
        if (this.state.surfaceCellType === this.flag || this.state.mode === 'open') {
            // console.log('return');
            // console.log('???')
            return;
        }
        
        // GameOver
        if (this.props.cellType !== this.mine) {
            this.setState({mode: 'open'})
            this.f_cellStatusCheck(true, false);
        } else if (this.props.cellType === this.mine) {
            this.setState({mode: 'open'})
            this.f_gameOver();
        }
        // this.changeImage(e);
    }

    f_clickedRightBtn = (e) => {
        e.preventDefault();
        //if (this.state.mode === 'mine');
        console.log('click Right');
        const mode = this.state.mode;

        if (this.state.surfaceCellType === this.flag) {
            console.log('reSet flag');
            this.setState({
                surfaceCellType: '',
            })
            this.f_cellStatusCheck(false, false);
            return;
        }

        if (mode === 'close') {
            
            this.setState({
                surfaceCellType: this.flag,
            })
        }

        ((this.state.innerCellType === this.mine) ? this.f_gameOver() : this.f_cellStatusCheck(true, false))

        // if (mode === )
        // (mode === 'open') ? this.setState({})
        // this.setState({
        //     mode: 'open'
        // })
        // this.changeImage(e);
    }

    downedBtnCell = (e) => {
        e.preventDefault();
        this.changeFloor(e);
    }

    upBtnCell = (e) => {
        e.preventDefault();
    }

    f_cellStatusCheck = (isCorrect, isGameOver) => {
        const cellStatus = this.cellStatus;
        cellStatus.isCorrect = isCorrect;
        cellStatus.isGameOVer = isGameOver
        this.props.onCheck(cellStatus);
    }

    f_gameOver = (e) => {
        //this.props.func('GameOver!');
        console.log('gameOVer!!!!!!!!');
        this.f_cellStatusCheck(false, true);
    }


    changeFloor = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            //document.getElementById(e.target.id)); // 클래스 내임 변경
            switch (e.button) {
                case 0:
                    console.log('downed case 0');
                    document.getElementById(e.target.id).style.backgroundColor = 'lightblue';
                    break;
                case 1:
                    console.log('downed case 1');
                    break;
                case 2:
                    console.log('downed case 2');
                    break;
                default:
                    console.log('downed case 3');
                    break;
            }
        }
    }

    changeImage = (e) => {
        e.preventDefault();
        if (typeof e === 'object') {
            switch (e.button) {
                // left click
                case 0:
                    // console.log('Click left btn : ' + e.target.id);
                    this.setState({
                        curImg: this.__img[0],
                    })
                    break;
                case 1:
                    // console.log('Click middle btn');
                    break;
                // right click
                case 2:
                    // console.log('Click right btn');
                    this.setState({
                        curImg: this.__img[0],
                    })
                    break;
                default:
                    console.log('Unknown btn');
                    break;
            }
        } 
    }
    // Todo: Inner cell click event
    f_clickedBtnCell = (e) => {
        // console.log('asdasd')
        // e.preventDefault();
        if (typeof e == 'object') {
            // console.log('e : '+e.button);
            switch (e.button) {
                // left click
                case 0:
                    this.f_clickedLeftBtn(e);
                    break;
                case 1:
                    // console.log('Click middle btn');
                    break;
                // right click
                case 2:
                    // console.log('Click right btn');
                    this.f_clickedRightBtn(e);
                    break;
                default:
                    // console.log('Unknown btn');
                    break;
            }
        }
        
        // this.props.onCheck(this.f_isCellCorrect);
        
    }

    f_isCellCorrect = () => {
        return this.state.isCorrect;
    }

    f_overedCell = (e) => {
        const id = e.currentTarget.id;

        const obj = document.getElementById(id);
        // obj.style.color = 'red';
        // obj.style.textAlign = 'center';
    }

    // close
    f_modeClose = () => {
        const innerCellType = this.props.cellType;
        const mode = this.state.mode;
        return ('')
        // if (cellType === this.flag) {
            
        // }
    }

    f_reset = () => {

        console.log('asd')

        // this.setState({surfaceCellType: ''})
    }

    componentDidUpdate = (props) => {
        // console.log('aaa')
        //console.log('isReset : '+props.isReset)
        if (props.isReset === true)
            this.setState({surfaceCellType: '',})
    }

    componentDidMount = () => {
        // if (this.state.mode === 'open')
        // this.props.f_reset;
        (this.state.mode === 'open' ? this.setState({cellSize: 26}) : this.setState({cellSize: 20}))

        // console.log('CheckGameOVer');
        // if (this.state.mode ===' open' && this.props.cellType === this.mine) {
        //     // this.state.innerCellType
        //     this.f_cellStatusCheck(false, false);
        // }

    }

    render() {
        //const elements = ['1', '2', '3', '4', '5'];
        // console.log(this.props.level);
        // if (this.props.isReset === true)
        //     var surfaceCellType = '';
        // else
        //     var surfaceCellType = '';

        // if (this.props.isReset === true)
        //     var surfaceCellType = '';
        // else
        var surfaceCellType = '';
        if (this.props.isReset === true) {
            surfaceCellType = '';
        } else {
            surfaceCellType = this.state.surfaceCellType;
        }
            
        // const surfaceCellType = this.state.surfaceCellType;
        const innerCellType = this.props.cellType;
        
        const mode = this.props.mode;
        console.log('Cell rendering')
        // if (this.props.isReset === true) {
        //     console.log('aaa')
        //     innerCellType = '';
        // }

        // if (innerCellType === this.mine)
        //     console.log('mode : '+this.props.mode)
        // console.log('innerType : '+innerCellType);
        if (this.props.mode === 'open' && innerCellType === this.mine)
            this.f_cellStatusCheck(false, true);
        //     this.f_cellStatusCheck(false, false);

        // console.log('mode : '+mode);
        // console.log('cellType : '+cellType)
        // const style = {
        //     // backgroundColor: (mode === 'open') ? 'red' : 'blue'
        // }

        // const wcellStyle = document.getElementById(wcellId).style;
        // wcellStyle.borderColor = '#F3F3F3'; // Cell default color
        // const sideWidth = this.state.sideWidth + 'px';
        // wcellStyle.border = sideWith + ' sold ' + 'F3F3F3';
        // wcellStyle.border = `${sideWidth} solid #F3F3F3`;
        // wcellStyle.border = `1px solid #F3F3F3`;
        // wcellStyle.borderColor = 'grey';
        // wcellStyle.width = '26px';
        // wcellStyle.height = '26px';
        // const cellSize = 
        // const mode = this.props.mode;

        const cellStyle = {
            
            width: (mode === 'close' ? '20px' : '26px'),
            height: (mode === 'close' ? '20px' : '26px'),
            backgroundColor: (mode === 'close' ? '#ECD8E6' : '#FFF7FF'),
            // hover: {backgroundColor: 'red'},
            // alignItems: 'center',
            // backgroundColor: (mode === 'close' ? 'red' : 'blue'),
            // (this.state.mode === 'open' ? this.setState({cellSize: 26}) : this.setState({cellSize: 20}))
            // height: '26px'
        }
        return (
            <>
                <div id={this.state.cellId} className='cell' onMouseUp={this.f_clickedBtnCell} onMouseOver={this.f_overedCell} style={cellStyle}>
                    {(mode === 'open') ? innerCellType : surfaceCellType}
                    {/* {innerCellType} */}
                    {/* {cellType} */}
                </div>
                {/* <button className='Cell' /> */}
                {/* <button className='Cell'/> */}
                {/* <div className='Cell'> </div> */}
                {/* <button className='Cell' onMouseDown={this.downedBtnPart} onClick={this.clickedPart} onMouseUp={this.upBtnPart} id={`mineDiv`+this.props.id} >
                </button> */}
            </>
        );
    }
}

export default Cell;

// create random array