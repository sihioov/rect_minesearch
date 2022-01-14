
import React from 'react';
import ReactDOM from 'react-dom';

class Mine extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state {
    //         test: 'test',
    //     };
    // }
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className="Mine">
            <button className="Mine">
                {this.props.value}
            </button>
            </div>
        )
    }
}

export default Mine;