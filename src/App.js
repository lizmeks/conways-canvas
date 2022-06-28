import { Component } from 'react';
import './styles/gridStyle.scss'
import { generateBlankBoard, generateNextBoard } from './Utilities/EngineUtils/EngineUtils';

class App extends Component {
  state = { 
    canvas: generateBlankBoard(10, 10)
  }

  renderGridCell = (cell, x, y) => {
    return (
      <div
        className='grid-cell'
        key={`${x}, ${y}`}
        style={{backgroundColor: '#' + cell.color}}
        onClick={() => this.paintHandler(x, y)}
      >
      </div>
    )
  };

  renderGrid = () => {
    let result = this.state.canvas.map((row, y) => {
      return row.map((cell, x) => {
        return this.renderGridCell(cell, x, y)
      })
    });
    return (
      <div className='grid-container'>
        { result }
      </div>
    )
  };

  paintHandler = (x, y) => {
    if (this.state.canvas[y][x].life === false) {
      this.state.canvas[y][x] = {
        life: true,
        color: "000000"
      }
    }
    else if (this.state.canvas[y][x].life === true) {
      this.state.canvas[y][x] = {
        life: false,
        color: "FFFFFF"
      }
    };
    this.forceUpdate();
  };

  stepHandler = () => {
    let newCanvas = generateNextBoard(this.state.canvas)
    this.setState({
      canvas: newCanvas
    })
  }

  render() { 
    return (
      <div className='page'>
        {this.renderGrid()}
        <button onClick={this.stepHandler}>Next Step</button>
      </div>
    );
  }
}
 
export default App;