import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import "./Register.css";

const userOptions = [
  { value: "1", label: "Administrador" },
  { value: "2", label: "Aluno" },
  { value: "3", label: "Professor" },
  { value: "4", label: "Servidor" },
  { value: "5", label: "Externo" },
];

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [course, setCourse] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (selectedOption) => {
    setSelectedUserType(selectedOption);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://prae-backend-projeto.herokuapp.com/users/",
        {
          name: name,
          email: email,
          password: password,
          type: selectedUserType.value,
          course: course,
        }
      );

      setSuccessMessage("Usuário criado com sucesso!");

      // Redirecionar para a tela de login após 2 segundos
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Container">
      <div className="wrapper">
        <div className="title">
          <span>Registrar</span>
        </div>

        <form>
          <div className="row">
            <i className="fas fa-user"></i>
            <input
              type="text"
              value={name}
              placeholder="Nome"
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              value={password}
              placeholder="Senha"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-users"></i>
            <Select
              className="selectUserType"
              value={selectedUserType}
              onChange={handleUserTypeChange}
              options={userOptions}
              placeholder="Tipo de usuário"
              isSearchable={false}
              required
            />
          </div>
          <div className="row">
            <i className="fas fa-graduation-cap"></i>
            <input
              type="text"
              value={course}
              placeholder="Curso"
              onChange={handleCourseChange}
              required
            />
          </div>
          <div className="buttonregister">
            <div className="row button">
              <button type="button" onClick={handleRegister}>
                Registrar
              </button>
            </div>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
