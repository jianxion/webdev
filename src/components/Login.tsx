import { useState } from 'react';

import type { FormEvent } from 'react';

import './Login.css';

interface LoginProps {
  isLogin: boolean;
  onSetIsLogin: (nextValue: boolean) => void;
}

const credentials = {
  username: 'jianxion',
  password: '123',
} as const;

function Login({ isLogin, onSetIsLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAuthenticated =
      username === credentials.username && password === credentials.password;

    if (isAuthenticated) {
      onSetIsLogin(true);
      localStorage.setItem('islogin', 'true');
      setHasError(false);
      return;
    }

    setHasError(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button type="submit">Submit</button>
      {hasError && !isLogin ? <p>Invalid username or password.</p> : null}
      <p>
        username is <strong>jianxion</strong>, password is <strong>123</strong>. Use this pair
        to log in and test my website!
      </p>
    </form>
  );
}

export default Login;