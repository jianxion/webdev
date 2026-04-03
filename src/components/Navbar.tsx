import { Link } from 'react-router-dom';

import type { MouseEvent } from 'react';

import './Navbar.css';

interface NavbarProps {
  isLogin: boolean;
  setIsLogin: (nextValue: boolean) => void;
}

const Navbar = ({ isLogin, setIsLogin }: NavbarProps) => {
  const handleLogout = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    localStorage.removeItem('islogin');
    setIsLogin(false);
  };

  return (
    <nav>
      <div className="left">{isLogin && <Link to="/"><span>Home</span></Link>}</div>

      <div className="right">
        {isLogin && <Link to="/cart"><span>Cart</span></Link>}
        {!isLogin && <span>Login</span>}
        {isLogin && (
          <Link to="/">
            <span onClick={handleLogout}>Logout</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;