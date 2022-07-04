import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/splash-logo.png';
import './RulesPage.scss';
import '../../styles/header.scss';
import ruleOne from '../../assets/images/rules-one.png';
import ruleTwo from '../../assets/images/rules-two.png';
import ruleThree from '../../assets/images/rules-three.png';
import ruleFour from '../../assets/images/rules-four.png';

const RulesPage = () => {
  return (
    <>
      <header className='header'>
            <div className='header__link-container'>
              <NavLink className='header__link' to={'/'}>
                <p className='header__link-text'>Login</p>
              </NavLink>
              <NavLink className='header__link' to={'/canvas'}>
                <p className='header__link-text'>Canvas</p>
              </NavLink>
              <NavLink className='header__link' to={'/rules'}>
                <p className='header__link-text'>Rules</p>
              </NavLink>
            </div>
            <img className='header__logo' src={logo} alt='logo' />
          </header>
      <main className='rules'>
        <div className='rules__container'>
          <p className='rules__text'>
            Any live cell with fewer than two live neighbours dies, due to underpopulation.
          </p>
          <img className='rules__image' src={ruleOne} alt='rule one' />
        </div>
        <div className='rules__container'>
          <p className='rules__text'>
            Any live cell with two or three live neighbours lives on to the next generation.
          </p>
          <img className='rules__image' src={ruleTwo} alt='rule two' />
        </div>
        <div className='rules__container'>
          <p className='rules__text'>
            Any live cell with more than three live neighbours dies, due to overpopulation.
          </p>
          <img className='rules__image' src={ruleThree} alt='rule three' />
        </div>
        <div className='rules__container'>
          <p className='rules__text'>
            Any dead cell with exactly three live neighbours becomes a live cell, due to reproduction.
          </p>
          <img className='rules__image' src={ruleFour} alt='rule four' />
        </div>
      </main>
    </>
   );
}
 
export default RulesPage;