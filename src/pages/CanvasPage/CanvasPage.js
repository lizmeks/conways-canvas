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
import saveIcon from '../../assets/icons/save-icon.svg';
import loadIcon from '../../assets/icons/load-icon.svg';
import PageHeader from '../../components/PageHeader/PageHeader';
import axios from 'axios';
import { SERVER_ENABLED, SERVER_TARGET } from '../../config';
import { debounce } from 'lodash';
class CanvasPage extends Component {
  state = { 
    canvas: generateBlankBoard(0, 0),
    playing: false,
    colorValue: {
      red: 0,
      green: 0,
      blue: 0
    },
    colorName: "black",
    erase: false,
    brushValue: brushes[0].value,
    brushName: "Dot",
    presetList: [],
    visibleMenu: undefined
  }

  playInterval = undefined;

  componentDidMount() {
    this.measureBoard();
    if(SERVER_ENABLED) {
      this.retrievePresetList().then(response => {
        this.setState({
          presetList: response.data
        })
      })
    }
    window.addEventListener('resize', debounce(this.measureBoard, 100));
  };

  retrievePresetList = () => {
    return axios.get(`${SERVER_TARGET}/presets`)
      .catch(error => {
        console.error(error.message);
        console.error('Could not retrieve premade canvas list')
      })
  };

  retrieveSelectedPreset = e => {
    if(SERVER_ENABLED && e.target.value) {
      this.pauseBoard();
      return axios.get(`${SERVER_TARGET}/presets/${e.target.value}`)
        .then(response => {
          this.setState({
            canvas: response.data
          })
        })
        .catch(error => {
          console.error(error.message);
          console.error('Could not retrieve canvas with this id')
        });
    }
  };

  measureBoard = () => {
    if (window.innerWidth > 1200) {
      this.setState({
        canvas: generateBlankBoard(100, 100)
      })
    }
    else {
      let canvasWidth = Math.floor((window.innerWidth / 12)) - 2;
      this.setState({
        canvas: generateBlankBoard(canvasWidth, 100)
      })
    }
  };

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
    let gridWidth = '';
    if (window.innerWidth > 1200) {
      gridWidth = 1200;
    }
    else {
      gridWidth = window.innerWidth - 24;
    };
    return (
      <div
        className='canvas'
        style={{width: gridWidth, height: '1200px'}}
        onClick={() => this.expandMenuHandler()}
      >
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
    this.measureBoard();
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
      canvas: generateNextBoard(generateRandomBoard(this.state.canvas.length, this.state.canvas[0].length))
    })
  };

  brushSelectHandler = (brushName) => {
    let selectedBrush = brushes.find(brush => brush.name === brushName);
    this.setState({
      brushValue: selectedBrush.value,
      brushName: selectedBrush.name
    })
  };

  saveHandler = () => {
    this.pauseBoard();
    localStorage.setItem("savedCanvas", JSON.stringify(this.state.canvas));
  };

  loadHandler = () => {
    if (localStorage.savedCanvas) {
      this.pauseBoard();
      this.setState({
        canvas: JSON.parse(localStorage.savedCanvas)
      })
    }
  };

  expandMenuHandler = menu => {
    if (this.state.visibleMenu === menu) {
      this.setState({
        visibleMenu: undefined
      })
    }
    else {
      this.setState({
        visibleMenu: menu
      })
    }
  };

  render() { 

    // const { presetList } = this.state;

    return (
      <>
        <PageHeader />
        <main className='page'>
          <div className='menu'>
            {/* <select className='menu__preset-select' onChange={this.retrieveSelectedPreset}>
              <option className='menu__preset-option' value="">- Load a Premade Canvas -</option>
              {
                presetList.map(canvas => (
                  <option
                    className='menu__preset-option'
                    key={canvas.id}
                    value={canvas.id}
                  >
                    {canvas.name}
                  </option>
                ))
              }
            </select> */}
            <div className='controls'>
              <button className='controls__title' onClick={() => this.expandMenuHandler('controls')}> Controls </button>
              <div className={this.state.visibleMenu === 'controls' ? 'controls__visible' : 'controls__hidden'}>
                <button className="controls__button" onClick={this.playHandler}>
                  <img className="controls__button-image" src={this.state.playing ? pauseIcon : playIcon} alt="play/pause"/>
                </button>
                <button className="controls__button" onClick={this.stepHandler}>
                  <img className="controls__button-image" src={nextIcon} alt="next step"/>
                </button>
                <button className="controls__button" onClick={this.randomBoardHandler}>
                  <img className="controls__button-image" src={randomIcon} alt="random canvas"/>
                </button>
                <button className="controls__button" onClick={this.clearCanvasHandler}>
                  <img className="controls__button-image" src={clearIcon} alt="clear canvas"/>
                </button>
                <button className="controls__button" onClick={this.saveHandler}>
                  <img className="controls__button-image" src={saveIcon} alt="save"/>
                </button>
                <button className="controls__button" onClick={this.loadHandler}>
                  <img className="controls__button-image" src={loadIcon} alt="load"/>
                </button>
              </div>
            </div>
            <div className='palette'>
              <button className='palette__title' onClick={() => this.expandMenuHandler('palette')}> Palette </button>
              <div className={this.state.visibleMenu === 'palette' ? 'palette__visible' : 'palette__hidden'}>
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
            </div>
            <div className='tools'>
              <button className='tools__title' onClick={() => this.expandMenuHandler('tools')}> Tools </button>
              <div className={this.state.visibleMenu === 'tools' ? 'tools__visible' : 'tools__hidden'}>
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
            </div>
            <div className='brushes'>
              <button className='brushes__title' onClick={() => this.expandMenuHandler('patterns')}> Patterns </button>
              <div className={this.state.visibleMenu === 'patterns' ? 'brushes__visible' : 'brushes__hidden'}>
                {this.renderToolItems("pattern")}
              </div>
            </div>
            <div className='brushes'>
              <button className='brushes__title' onClick={() => this.expandMenuHandler('stillLifes')}> Still Lifes </button>
              <div className={this.state.visibleMenu === 'stillLifes' ? 'brushes__visible' : 'brushes__hidden'}>
                {this.renderToolItems("still life")}
              </div>
            </div>
            <div className='brushes'>
              <button className='brushes__title' onClick={() => this.expandMenuHandler('oscillators')}> Oscillators </button>
              <div className={this.state.visibleMenu === 'oscillators' ? 'brushes__visible' : 'brushes__hidden'}>
                {this.renderToolItems("oscillator")}
              </div>
            </div>
            <div className='brushes'>
              <button className='brushes__title' onClick={() => this.expandMenuHandler('spaceships')}> Spaceships </button>
              <div className={this.state.visibleMenu === 'spaceships' ? 'brushes__visible' : 'brushes__hidden'}>
                {this.renderToolItems("spaceship")}
              </div>
            </div>
            <div className='brushes'>
              <button className='brushes__title' onClick={() => this.expandMenuHandler('guns')}> Guns </button>
              <div className={this.state.visibleMenu === 'guns' ? 'brushes__visible' : 'brushes__hidden'}>
                {this.renderToolItems("gun")}
              </div>
            </div>
          </div>
          {this.renderGrid()}
        </main>
      </>
    );
  }
}
 
export default CanvasPage;