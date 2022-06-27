import { Component } from 'react';
import './styles/gridStyle.scss'
import { generateBlankBoard, generateNextBoard } from './Utilities/EngineUtils/EngineUtils';

class App extends Component {
  state = { 
    board: generateBlankBoard(10, 10)
  }

  renderGridCell = (cell, x, y) => {
    return (
      <div
        className='grid-cell'
        key={`${x}, ${y}`}
        style={{backgroundColor: '#' + cell.color}}
      >
      </div>
    )
  }

  renderGrid = () => {
    let result = this.state.board.map((row, y) => {
      return row.map((cell, x) => {
        return this.renderGridCell(cell, x, y)
      })
    })
    return (
      <div className='grid-container'>
        { result }
      </div>
    )
  }
  
  render() { 
    return (
      <div className='page'>
        {this.renderGrid()}
      </div>
    );
  }
}
 
export default App;