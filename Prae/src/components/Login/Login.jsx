import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../auth/context";
import api from "../../api/api";
import { Navigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const { login, logout, user } = useContext(AppContext);
  const [redirectToRegister, setRedirectToRegister] = useState(false);

  useEffect(() => {
    async function teste() {
      const teste = await api.get("/");
    }
    teste();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    if (user) {
      console.log(user); // Aqui você pode acessar o objeto do usuário
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/book", { state: { user } });
    } catch (error) {
      setError(
        "Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  const handleRegister = () => {
    setRedirectToRegister(true);
  };

  if (redirectToRegister) {
    return <Navigate to="/register" />;
  }

  return (
    <div class="Container">
      {loggedIn ? (
        <div>
          <h1>Você está logado!</h1>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div class="ContainerLogin">
          <div class="wrapper">
            <div class="titleLogin">
              <span>Login</span>
            </div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div class="row">
                <i class="fas fa-user"></i>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div class="row">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  value={password}
                  placeholder="Senha"
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div class="buttonsLogin">
                <div class="row button">
                  <button type="button" onClick={handleRegister}>
                    Registrar
                  </button>
                </div>
                <div class="row button">
                  <button type="submit">Entrar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
