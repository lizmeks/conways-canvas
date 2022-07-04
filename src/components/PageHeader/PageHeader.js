import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/splash-logo.png';
import './PageHeader.scss';

const PageHeader = () => {
  return ( 
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
  );
}
 
export default PageHeader;