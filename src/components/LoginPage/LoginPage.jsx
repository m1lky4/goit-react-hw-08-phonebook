import React, { useState } from 'react';
import { loginUserAsync } from 'redux/authSlice';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      // Викликати функцію loginUserAsync для виконання запиту на сервер
      const response = await loginUserAsync(user);
      const token = response.data.token;

      console.log(token);
      onLogin(token);
    } catch (error) {
      // Обробка помилок під час аутентифікації
      console.log('Помилка при вході:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
