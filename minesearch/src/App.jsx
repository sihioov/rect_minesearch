import { Component } from 'react';
import Board from './components/Board';

class App extends Component {
  constructor() {
    super();
    //writeLog();
  }

  componentDidMount = (e) => {
    var board = document.getElementsByClassName('Board');
    //board.addEventListener('click', (e) => {console.log('zxc')}, false);
  }

  render() {
    return (
      <>
        <Board />
      </>
    )
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <div className="App">
//         Hello World!
//       </div>
//     </div>
//   );
// }

// export default App;