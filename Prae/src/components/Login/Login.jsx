import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../../auth/context';
import api from '../../api/api';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const { login, logout } = useContext(AppContext);

  useEffect(() =>  {
     async function teste() {
      const teste = await api.get("/")
      console.log(teste);
    }
    teste();
  }, [])



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password)
      await login(email, password);

    } catch (error) {
      setError('Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Você está logado!</h1>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={handleEmailChange} required />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" value={password} onChange={handlePasswordChange} required />
            </div>
            <button type="submit">Entrar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;