import './HomePage.scss';
import { Component } from 'react';
import logo from '../../assets/images/splash-logo.png';
import githubIcon from '../../assets/icons/github-icon.svg';
import linkedinIcon from '../../assets/icons/linkedin-icon.svg';
import { NavLink } from 'react-router-dom';

class Homepage extends Component {
  state = {  } 
  render() { 
    return (
      <main className='splash'>
        <div className='splash__container'>
          <img className='splash__logo' src={logo} alt="conway's canvas" />
          <div className='splash__info-container'>
            <p className='splash__title-text'>A Project by Liz</p>
            <div className='splash__link-container'>
              <p className='splash__text'>GitHub:</p>
              <a href='https://github.com/lizardskelly'>
                <img className='splash__image' src={githubIcon} alt='github' />
              </a>
            </div>
            <div className='splash__link-container'>
              <p className='splash__text'>LinkedIn:</p>
              <a href='https://www.linkedin.com/in/elizabeth-meeker-83781b237/'>
                <img className='splash__image' src={linkedinIcon} alt='linkedin' />
              </a>
            </div>
            <NavLink to='/canvas'>
              <button className='splash__button'>Continue</button>
            </NavLink>
          </div>
        </div>
      </main>
    );
  }
}
 
export default Homepage;