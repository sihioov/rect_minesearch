import { Component } from 'react';
import Part from './Part';
import '../css/land.css'
class Land extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: '20',
            mineCount: Math.ceil(Math.random() * 99),
            elements1: ['1', '2', '3', '4', '5'],
            level: this.props.level,
        }

        
    }

    renderParts = (e) => {
        
    }

    randomMineLaying = (level) => {
        console.log('Random mining' + level);
    }

    componentDidMount = () => {
        //console.log('didmound')
    }


    render() {

        // Random mine-laying by level
        this.randomMineLaying(this.state.level);
            
        const elements = ['1', '2', '3', '4', '5'];
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
                            <div key={index} className='part' id={index}>
                                <Part id={value} />
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