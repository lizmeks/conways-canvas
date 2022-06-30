import { Component } from 'react';
import { cloneDeep } from 'lodash';
import './styles/gridStyle.scss'
import { generateBlankBoard, generateNextBoard } from './Utilities/EngineUtils/EngineUtils';

class App extends Component {
  state = { 
    canvas: generateBlankBoard(100, 100),
    playing: false,
    selectedColor: {
      red: 0,
      green: 0,
      blue: 0
    }
  }

  playInterval = undefined;

  playHandler = () => {
    if (!this.state.playing) {
      this.setState({
        playing: true
      })
      this.playInterval = setInterval(this.stepHandler, 100);
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
        style={{backgroundColor: `rgb(${cell.color.red}, ${cell.color.green}, ${cell.color.blue})`}}
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
        color: this.state.selectedColor
      }
      this.setState({
        canvas: newCanvas
      })
    }
    else if (this.state.canvas[y][x].life === true) {
      let newCanvas = cloneDeep(this.state.canvas);
      newCanvas[y][x] = {
        life: false,
        color: {
          red: 255,
          green: 255,
          blue: 255
        }
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

  colorSelectHandler = (e) => {
    let selectedColor = JSON.parse(e.target.value)
    this.setState({
      selectedColor: selectedColor.color
    })
  }

  render() { 
    return (
      <div className='page'>
        <select onChange={this.colorSelectHandler}>
          <option
            value={JSON.stringify({
              color: {
              red: 0,
              green: 0,
              blue: 0
              }
            })}
          >
            Black
          </option>
          <option
            value={JSON.stringify({
              color: {
              red: 255,
              green: 0,
              blue: 0
              }
            })}
          >
            Red
          </option>
          <option
            value={JSON.stringify({
              color: {
              red: 0,
              green: 255,
              blue: 0
              }
            })}
          >
            Green
          </option>
          <option
            value={JSON.stringify({
              color: {
              red: 0,
              green: 0,
              blue: 255
              }
            })}
          >
            Blue
          </option>
        </select>
        {this.renderGrid()}
        <button onClick={this.stepHandler}>Next Step</button>
        <button onClick={this.clearCanvasHandler}>Clear Canvas</button>
        <button onClick={this.playHandler}>{this.state.playing ? "Pause" : "Play"}</button>
      </div>
    );
  }
}
 
export default App;