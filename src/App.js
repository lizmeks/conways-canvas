import { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CanvasPage from './pages/CanvasPage/CanvasPage';

class App extends Component {
  state = { 

  }

  render() { 
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={CanvasPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
 
export default App;