import { Component } from 'react';
import { cloneDeep } from 'lodash';
import './styles/gridStyle.scss'
import { generateBlankBoard, generateNextBoard } from './Utilities/EngineUtils/EngineUtils';

class App extends Component {
  state = { 
    canvas: generateBlankBoard(100, 100),
    playing: false
  }

  playInterval = undefined;

  playHandler = () => {
    if (!this.state.playing) {
      this.setState({
        playing: true
      })
      this.playInterval = setInterval(this.stepHandler, 250);
    }
    if (this.state.playing) {
      this.pauseBoard();
    }
  };

  pauseBoard = () => {
    this.setState({
      playing: false
    })
    clearInterval(this.playInterval);
  };

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
      let newCanvas = cloneDeep(this.state.canvas);
      newCanvas[y][x] = {
        life: true,
        color: "000000"
      }
      this.setState({
        canvas: newCanvas
      })
    }
    else if (this.state.canvas[y][x].life === true) {
      let newCanvas = cloneDeep(this.state.canvas);
      newCanvas[y][x] = {
        life: false,
        color: "FFFFFF"
      }
      this.setState({
        canvas: newCanvas
      })
    }
  };

  stepHandler = () => {
    let newCanvas = generateNextBoard(this.state.canvas)
    this.setState({
      canvas: newCanvas
    })
  }

  clearCanvasHandler = () => {
    this.setState({
      canvas: generateBlankBoard(100, 100)
    })
    this.pauseBoard();
  }

  render() { 
    return (
      <div className='page'>
        {this.renderGrid()}
        <button onClick={this.stepHandler}>Next Step</button>
        <button onClick={this.clearCanvasHandler}>Clear Canvas</button>
        <button onClick={this.playHandler}>{this.state.playing ? "Pause" : "Play"}</button>
      </div>
    );
  }
}
 
export default App;