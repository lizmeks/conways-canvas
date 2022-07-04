import './HomePage.scss';
import { Component } from 'react';
import logo from '../../assets/images/splash-logo.png';
import { NavLink } from 'react-router-dom';

class Homepage extends Component {
  state = {  } 
  render() { 
    return (
      <main className='splash'>
        <div className='splash__container'>
          <img className='splash__logo' src={logo} alt="conway's canvas" />
          <div className='splash__login-container'>
            <label className='splash__label'>Username</label>
            <input className='splash__input' placeholder='Enter your username...'/>
            <label className='splash__label'>Password</label>
            <input className='splash__input' placeholder='Enter your password...'/>
            <button className='splash__button'>Login</button>
            <div className='splash__link-container'>
              <NavLink className='splash__link' to={'/'}>
                <p className='splash__link-text'>Create an account</p>
              </NavLink>
              <NavLink className='splash__link' to={'/canvas'}>
                <p className='splash__link-text'>Skip login</p>
              </NavLink>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
 
export default Homepage;