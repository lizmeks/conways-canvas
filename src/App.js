import { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CanvasPage from './pages/CanvasPage/CanvasPage';
import HomePage from './pages/HomePage/HomePage';

class App extends Component {
  state = { 

  }

  render() { 
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/canvas' component={CanvasPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
 
export default App;