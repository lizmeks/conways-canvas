import { Component } from 'react';
import '../../styles/gridStyle.scss'
import { generateBlankBoard, generateNextBoard, generateRandomBoard } from '../../Utilities/EngineUtils/EngineUtils';
import brushes from '../../Utilities/Brushes/brushes';
import colors from '../../Utilities/Colors/colors';

class CanvasPage extends Component {
  state = { 
    canvas: generateBlankBoard(100, 100),
    playing: false,
    selectedColor: {
      red: 0,
      green: 0,
      blue: 0
    },
    erase: false,
    brush: brushes[0].brush
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
      <div className='grid-container' >
        { result }
      </div>
    )
  };

  paintHandler = (clickX, clickY) => {
    let { canvas, brush, selectedColor, erase } = this.state;

    brush.forEach((brushRow, brushY) => {
      brushRow.forEach((brushCell, brushX) => {
        if(brushCell === 1) { 
          let targetY = clickY + brushY - (Math.floor(brush.length / 2));
          let targetX = clickX + brushX - (Math.floor(brush[0].length / 2));
          if(canvas[targetY] && canvas[targetY][targetX ]) { 
            canvas[targetY][targetX] = {
              color: erase ? {red: 255, green: 255, blue: 255} : selectedColor,
              life: erase ? false : true
            }
          } 
        }
      })
    })
    this.forceUpdate();
  };

  eraseHandler = () => {
    if (this.state.erase) {
      this.setState({
        erase: false
      })
    }
    else {
      this.setState({
        erase: true
      })
    }
  };

  stepHandler = () => {
    let newCanvas = generateNextBoard(this.state.canvas)
    this.setState({
      canvas: newCanvas
    })
  };

  clearCanvasHandler = () => {
    this.setState({
      canvas: generateBlankBoard(100, 100)
    })
    this.pauseBoard();
  };

  colorSelectHandler = (e) => {
    let selectedColor = colors.find(color => color.name === e.target.value);
    this.setState({
      selectedColor: selectedColor.value
    })
  };

  randomBoardHandler = () => {
    this.pauseBoard();
    this.setState({
      canvas: generateNextBoard(generateRandomBoard(100, 100))
    })
  };

  brushSelectHandler = (e) => {
    let selectedBrush = brushes.find(element => element.name === e.target.value);
    this.setState({
      brush: selectedBrush.brush
    })
  };

  render() { 
    return (
      <div className='page'>
        <select onChange={this.colorSelectHandler}>
          {
            colors.map(color => {
              return (
                <option
                  key={color.id}
                  value={color.name}
                >
                  {color.name}
                </option>
              )
            })
          }
        </select>
        <button onClick={this.eraseHandler}>{this.state.erase ? "Erase: On" : "Erase: Off"}</button>
        <select onChange={this.brushSelectHandler}>
          {
            brushes.map(element => {
              return (
                <option
                  key={element.id}
                  value={element.name}
                >
                  {element.name}
                </option>
              )
            })
          }
        </select>
        {this.renderGrid()}
        <button onClick={this.stepHandler}>Next Step</button>
        <button onClick={this.clearCanvasHandler}>Clear Canvas</button>
        <button onClick={this.randomBoardHandler}>Random Canvas</button>
        <button onClick={this.playHandler}>{this.state.playing ? "Pause" : "Play"}</button>
      </div>
    );
  }
}
 
export default CanvasPage;