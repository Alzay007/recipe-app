import { Link, NavLink } from 'react-router-dom';

import styles from './Header.module.scss';
import logo from 'assets/icons/logo.png';
import { useAuth } from 'features/hooks/useAuth';

export const ROUTER = {
  home: '/',
  account: '/account',
  login: '/login',
  signUp: '/registration',
  saved: '/saved'
};

export const Header = () => {
  const { isAuth } = useAuth();

  return (
    <div className={styles.header}>
      <div className={styles.header__nav}>
        <div className={styles.header__icon}>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.header__logo} />
          </Link>
        </div>
      </div>

      <nav className={styles.header__list}>
        <NavLink to={ROUTER.home} className={styles.header__link}>
          Home
        </NavLink>
      </nav>

      <div className={styles.header__icons}>
        <NavLink to="/saved" className={styles.header__item} title="Saved">
          <div className={styles.header__saved}></div>
        </NavLink>

        {isAuth && <div className={styles.header__signIn}></div>}

        <NavLink to="/login" className={styles.header__item} title="Login">
          <div className={styles.header__login}></div>
        </NavLink>
      </div>
    </div>
  );
};
