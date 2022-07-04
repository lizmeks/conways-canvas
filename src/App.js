import { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CanvasPage from './pages/CanvasPage/CanvasPage';
import HomePage from './pages/HomePage/HomePage';
import RulesPage from './pages/RulesPage/RulesPage';

class App extends Component {
  state = { 

  }

  render() { 
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/canvas' component={CanvasPage} />
          <Route path='/rules' component={RulesPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
 
export default App;