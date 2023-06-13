import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

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
      const response = await axios.post('https://prae-backend-projeto.herokuapp.com/login', { email, password });

      if (response.status === 200) {
        // Definir o estado de autenticação como true
        setLoggedIn(true);
        // Limpar os campos de email e senha
        setEmail('');
        setPassword('');
        // Limpar a mensagem de erro, se houver
        setError('');
      } else {
        setError('Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente.');
      }
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