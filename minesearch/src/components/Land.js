import { Component } from 'react';
import Parts from './Parts';

class Land extends Component {
    constructor() {
        super();

        this.state = {
            count: '20',
        }
    }

    // loopRender = (e) => {
        
    //     const list = [];

    //     for (var i = 0; i<10; i++) {
    //         list.push(<Parts/>);
    //     }

    //     return (
    //         <>
    //             {list}
    //         </>
    //     )
    // }

    render() {


        return (
            <>
                <Parts />
            </>
        )
        // return (
        // <>
            
        // </ >
        // );
    }
}

export default Land;