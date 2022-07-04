import { Component } from 'react';
import '../../styles/global.scss';
import './CanvasPage.scss';
import { generateBlankBoard, generateNextBoard, generateRandomBoard } from '../../Utilities/EngineUtils/EngineUtils';
import brushes from '../../Utilities/Brushes/brushes';
import colors from '../../Utilities/Colors/colors';
import nextIcon from '../../assets/icons/next-icon.svg';
import playIcon from '../../assets/icons/play-icon.svg';
import pauseIcon from '../../assets/icons/pause-icon.svg';
import clearIcon from '../../assets/icons/clear-icon.svg';
import randomIcon from '../../assets/icons/random-icon.svg';
import eraserIcon from '../../assets/icons/eraser-icon.svg';
import pencilIcon from '../../assets/icons/pencil-icon.svg';

class CanvasPage extends Component {
  state = { 
    canvas: generateBlankBoard(100, 100),
    playing: false,
    colorValue: {
      red: 0,
      green: 0,
      blue: 0
    },
    colorName: "black",
    erase: false,
    brushValue: brushes[0].value,
    brushName: "Dot"
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
        className='canvas__cell'
        key={`${x}, ${y}`}
        style={{backgroundColor: `rgb(${cell.color.red}, ${cell.color.green}, ${cell.color.blue})`}}
        onClick={() => this.paintHandler(x, y)}
      >
      </div>
    )
  };

  renderGrid = () => {
    let grid = this.state.canvas.map((row, y) => {
      return row.map((cell, x) => {
        return this.renderGridCell(cell, x, y)
      })
    });
    return (
      <div className='canvas'>
        { grid }
      </div>
    )
  };

  renderBrushImage = (brushValue) => {
    let image = brushValue.map((row, y) => {
      return row.map((cell, x) => {
        return this.renderBrushImageCell(cell, x, y)
      })
    });
    return (
      <div className='brushes__image' style={{width: `${(brushValue[0].length * 0.75) + (2/16)}rem`}}>
        { image }
      </div>
    )
  }

  renderBrushImageCell = (cell, x, y) => {
    const { colorValue } = this.state;
    return (
      <div
        className='brushes__image-cell'
        key={`${x}, ${y}`}
        style={cell ? {backgroundColor: `rgb(${colorValue.red}, ${colorValue.green}, ${colorValue.blue})`} : {backgroundColor: `rgb(255,255,255)`}}
      >
      </div>
    )
  }

  renderToolItems = (itemType) => {
    return brushes.filter(brush => brush.type === itemType).map(brush => {
      return (
        <button
          key={brush.id}
          value={brush.name}
          className="brushes__list-item"
          onClick={() => this.brushSelectHandler(brush.name)}
          style={this.state.brushName === brush.name ? {boxShadow: "inset 0px 0px 10px 4px #999"} : {boxShadow: "none"}}
        >
          {this.renderBrushImage(brush.value)}
        </button>
      )
    })
  };

  paintHandler = (clickX, clickY) => {
    let { canvas, brushValue, colorValue, erase } = this.state;

    brushValue.forEach((brushRow, brushY) => {
      brushRow.forEach((brushCell, brushX) => {
        if(brushCell === 1) { 
          let targetY = clickY + brushY - (Math.floor(brushValue.length / 2));
          let targetX = clickX + brushX - (Math.floor(brushValue[0].length / 2));
          if(canvas[targetY] && canvas[targetY][targetX ]) { 
            canvas[targetY][targetX] = {
              color: erase ? {red: 255, green: 255, blue: 255} : colorValue,
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

  colorSelectHandler = (colorName) => {
    let selectedColor = colors.find(color => color.name === colorName);
    this.setState({
      colorValue: selectedColor.value,
      colorName: selectedColor.name,
      erase: false
    })
  };

  randomBoardHandler = () => {
    this.pauseBoard();
    this.setState({
      canvas: generateNextBoard(generateRandomBoard(100, 100))
    })
  };

  brushSelectHandler = (brushName) => {
    let selectedBrush = brushes.find(brush => brush.name === brushName);
    this.setState({
      brushValue: selectedBrush.value,
      brushName: selectedBrush.name
    })
  };

  render() { 
    return (
      <main className='page'>
        {this.renderGrid()}
        <div className='menu'>
          <div className='menu__button-container'>
            <button className="menu__button" onClick={this.playHandler}>
              <img className="menu__button-image" src={this.state.playing ? pauseIcon : playIcon} alt="play/pause"/>
            </button>
            <button className="menu__button" onClick={this.stepHandler}>
              <img className="menu__button-image" src={nextIcon} alt="next step"/>
            </button>
            <button className="menu__button" onClick={this.randomBoardHandler}>
              <img className="menu__button-image" src={randomIcon} alt="random canvas"/>
            </button>
            <button className="menu__button" onClick={this.clearCanvasHandler}>
              <img className="menu__button-image" src={clearIcon} alt="clear canvas"/>
            </button>
          </div>
          <div className='palette'>
            {
              colors.map(color => {
                return (
                  <button
                    className='palette__button'
                    key={color.id}
                    onClick={() => this.colorSelectHandler(color.name)}
                    style={this.state.colorName === color.name ? {boxShadow: "inset 0px 0px 10px 4px #999"} : {boxShadow: "none"}}
                  >
                    <div
                      className='palette__button--color'
                      style={{backgroundColor: `rgb(${color.value.red}, ${color.value.green}, ${color.value.blue})`}}
                    >
                    </div>
                  </button>
                )
              })
            }
          </div>
          <div className='tools'>
            <button
              className='tools__item'
              onClick={() => this.brushSelectHandler("Dot")}
              style={this.state.brushName === "Dot" ? {boxShadow: "inset 0px 0px 10px 4px #999"} : {boxShadow: "none"}}
            >
              <img className='tools__item-image' src={pencilIcon} alt="pencil"/>
            </button>
            <button
              className='tools__item'
              onClick={this.eraseHandler}
              style={this.state.erase ? {boxShadow: "inset 0px 0px 10px 4px #999"} : {boxShadow: "none"}}
            >
              <img src={eraserIcon} alt="eraser"/>
            </button>
          </div>
          <div className='brushes'>
            <div className='brushes__container'>
              <p className='brushes__text'>Patterns</p>
              <div className='brushes__list'>
                {this.renderToolItems("pattern")}
              </div>
            </div>
            <div className='brushes__container'>
              <p className='brushes__text'>Still Lifes</p>
              <div className='brushes__list'>
                {this.renderToolItems("still life")}
              </div>
            </div>
            <div className='brushes__container'>
              <p className='brushes__text'>Oscillators</p>
              <div className='brushes__list'>
                {this.renderToolItems("oscillator")}
              </div>
            </div>
            <div className='brushes__container'>
              <p className='brushes__text'>Spaceships</p>
              <div className='brushes__list'>
                {this.renderToolItems("spaceship")}
              </div>
            </div>
            <div className='brushes__container'>
              <p className='brushes__text'>Guns</p>
              <div className='brushes__list'>
                {this.renderToolItems("gun")}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
 
export default CanvasPage;