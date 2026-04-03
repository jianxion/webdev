import { useEffect } from 'react';

import List from './List';
import Login from './Login';

interface MainProps {
  isLogin: boolean;
  setIsLogin: (nextValue: boolean) => void;
}

const Main = ({ isLogin, setIsLogin }: MainProps) => {
  useEffect(() => {
    const login = localStorage.getItem('islogin');
    setIsLogin(login === 'true');
  }, [setIsLogin]);

  return (
    <div className="main_container">
      {isLogin ? <List /> : <Login isLogin={isLogin} onSetIsLogin={setIsLogin} />}
    </div>
  );
};

export default Main;